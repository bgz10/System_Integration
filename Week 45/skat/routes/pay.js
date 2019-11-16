const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const skat_db =  new sqlite3.Database('../skat/data/skat.sqlite');
const keys_db = new sqlite3.Database('../keys.sqlite');

module.exports = (req, res) =>{
    
    let pload = req.body.token;
    var query = "SELECT * FROM public_keys WHERE service = ?";

    keys_db.get(query, ['main'], function(er, ajRows)
    {
        if(er) 
            return res.status(500).send("There has been an error. We were not able to retrieve your info.");

        if(ajRows)
        {
            var verifyOptions = {
                issuer:  "Main Server",
                audience:  "SKAT",
                algorithm:  ["RS256"]
            };
    
            jwt.verify(pload, ajRows.key, verifyOptions, (err, payload) =>
            {
                if(err)
                    return res.status(400).send("The payload has been tainted, invalid key or audience");
            
                // Check the amount versus the balance.
                var s_query = "SELECT * FROM users_skat WHERE id = ?";

                skat_db.get(s_query, [payload.id], function(er, aj)
                {
                    if(er) 
                        return res.status(500).send("There has been an error. We were not able to retrieve your info.");

                    if(aj)
                    {
                        
                        var due = aj.debt;
                        var url = 'http://localhost:8888/withdraw';
                        axios.post(url, {'token': pload, 'amount': due})
                        .then((r) =>
                        {
                            if(r.status == 200){
                                var s_query = "UPDATE users_skat SET debt = 0 WHERE id= ?";
                                skat_db.run(s_query, [payload.id], function(e) {
                                    if(e) return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                                    if(this.changes == 1)
                                    {
                                        console.log("Success - Debt paid")
                                        return res.status(r.status).send(JSON.stringify({'debt': 0, 'message': 'Debt Paid'}));
                                    }
                                });
                            }
                            else if(r.status == 502)
                            {
                                console.log("Not enough money")
                                return res.status(r.status).send(JSON.stringify({'debt':ajRows.debt,'message': 'Inssuficient funds.'}));
                            }
                            else
                                return res.status(500).send(JSON.stringify({'debt':null,'message': 'No user has been found in the db with that id.'}));
                        })
                        .catch((err) => {

                            return res.status(502).send(JSON.stringify({'debt':ajRows.debt, 'message': 'Inssuficient funds.'}));
                        });
                    }    
                });
            });
        }
    });
};