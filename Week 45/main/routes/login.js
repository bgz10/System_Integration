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
                console.log(u_data);
                var u_querry = "SELECT * FROM users WHERE email = ? AND password = ?";
                users_db.get(u_querry, u_data, function(err, aj)
                {
                    if(err) 
                        return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                    console.log(aj);
                    if(aj)
                    {
                        var private_key = fs.readFileSync('privkey.pem').toString();
                        console.log(private_key)
                        let token = jwt.sign(
                                { 
                                "id": ajRows.id,
                                "email": ajRows.email,
                                "name": ajRows.name
                                },
                                private_key, 
                                { algorithm: 'RS256' }
                            );
                        console.log(token);
                        return res.status(200).send(JSON.stringify({'key': token, 'message': 'Authorized'}));
                    }
                    return res.status(500).send(JSON.stringify({'key':null,'message': 'No user has been found in the db with that password'}));
                });

            });
        }
    });
};