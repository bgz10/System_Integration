const sqlite3 = require('sqlite3').verbose();
const guid4 = require('uuid/v4');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const users_db =  new sqlite3.Database('./db/users.sqlite');
const bank_db =  new sqlite3.Database('../bank/data/bank.sqlite');
const skat_db =  new sqlite3.Database('../skat/data/skat.sqlite');
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

                let g = guid4();
                let u_data = [g.substr(0, 6), payload.email, payload.name, payload.password];
                let b_data = [g.substr(0, 6), payload.email, 0];

                let u_query = "INSERT INTO users VALUES(?, ?, ?, ?)";
                let b_query = "INSERT INTO users_bank VALUES(?, ?, ?)";
                let s_query = "INSERT INTO users_skat VALUES(?, ?, ?)";

                users_db.run(u_query, u_data, (err) =>
                    {
                        if(err)
                            return res.status(500).send("There has been an error. We were not able to register you.");
                    }
                );

                bank_db.run(b_query, b_data, (e) =>
                    {
                        if(e)
                            return res.status(500).send("There has been an error. We were not able to register you.");
                    }
                );

                skat_db.run(s_query, b_data, (e) =>
                    {
                        if(e)
                            return res.status(500).send("There has been an error. We were not able to register you.");
                    }
                );
                console.log("Registered a new user");
                return res.status(200).send("You have successfully been registered in the main server");
            });
        }
    });
};