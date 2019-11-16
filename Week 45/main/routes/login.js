const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const users_db =  new sqlite3.Database('./db/users.sqlite');
const keys_db = new sqlite3.Database('../keys.sqlite');

module.exports = (req, res) => {

    let pload = req.body.token;
    var querry = "SELECT * FROM public_keys WHERE service = ?";
    keys_db.get(querry, ['user'], function(er, ajRows)
    {

        if(er) 
            return res.status(500).send("There has been an error. We were not able to retrieve your info.");
    
        if(ajRows)
        {
            jwt.verify(pload , ajRows.key, { algorithms: ['RS256'] }, (err, payload) =>
            {
                if(err)
                    return res.status(400).send("The payload has been tainted or invalid key");

                var u_data = [payload.email, payload.password];
                var u_querry = "SELECT * FROM users WHERE email = ? AND password = ?";
                users_db.get(u_querry, u_data, function(err, aj)
                {
                    if(err) 
                        return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                    if(aj)
                    {
                        var private_key = fs.readFileSync('privkey.pem', 'utf8');
                        
                        // SIGNING OPTIONS
                        var signOptions = {
                            issuer:  "Main Server",
                            audience:  ["USER", "BANK", "SKAT"],
                            algorithm:  "RS256"
                        };
                        var pload = { 
                            id : aj.id,
                            email: aj.email,
                            name: aj.name
                            };
                        let token = jwt.sign(
                                pload,
                                private_key, 
                                signOptions
                            );
                        console.log("Success");
                        return res.status(200).send(JSON.stringify({'key': token, 'message': 'Authorized'}));
                    }
                    return res.status(500).send(JSON.stringify({'key':null,'message': 'No user has been found in the db with that password'}));
                });

            });
        }
    });
};