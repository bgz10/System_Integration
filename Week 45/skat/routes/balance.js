const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

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

                var querry = "SELECT * FROM users_skat WHERE id = ?";
                skat_db.get(querry, [payload.id], function(error, aj){
                    if(error)
                        return res.status(500).send(JSON.stringify({'debt':null,'message': 'No user has been found in the db with that password'}));   

                    if(aj)
                    {
                        console.log("Success - Overview Sent");
                        return res.status(200).send(JSON.stringify({'debt': aj.debt, 'message': 'Authorized'}));
                    }
                });

            });

        }

    });
};