const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const skat_db =  new sqlite3.Database('../skat/data/skat.sqlite');

module.exports = (req, res) =>{
    console.log("Somebody wants to pay his/her debt...");
    var token = req.body.access_token;
    var secret = 'secret';

    jwt.verify(token, secret, (err, data) =>{
        if(err) return res.status(500).send("This token was not able to be verified or internal error");
        
        var querry = "SELECT * FROM users_skat WHERE id = ?";

            skat_db.get(querry, [data.id], function(err, ajRows){
                if(ajRows){
                    
                    var due = ajRows.debt;
                    var url = 'http://localhost:8888/withdraw';
                    axios.post(url, {'access_token': token, 'amount': due})
                    .then((r) =>
                    {
                        console.log(r);
                        if(r.status == 200){
                            var sQuery = "UPDATE users_skat SET debt = 0 WHERE id= ?";
                            skat_db.run(sQuery, [data.id], function(err) {
                                if(err) return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                                if(this.changes == 1){
                                    return res.status(r.status).send(JSON.stringify({'debt': 0, 'message': 'Debt Paid'}));
                                }
                            });
                        }
                        else if(r.status == 502)
                            return res.status(r.status).send(JSON.stringify({'debt':ajRows.debt,'message': 'Inssuficient funds.'}));
                        else
                            return res.status(500).send(JSON.stringify({'debt':null,'message': 'No user has been found in the db with that id.'}));
                    })
                    .catch((err) => {
                        console.log(ajRows.debt)
                        return res.status(502).send(JSON.stringify({'debt':ajRows.debt, 'message': 'Inssuficient funds.'}));
                    });
                }    
            });
    });

};