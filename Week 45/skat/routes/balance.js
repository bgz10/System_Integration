const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const skat_db =  new sqlite3.Database('../skat/data/skat.sqlite');

module.exports = (req, res) =>{
    console.log("Somebody wants to access his/her SKAT overview...");
    var token = req.body.access_token;
    var secret = 'secret';

    jwt.verify(token, secret, (err, data) =>{
            if(err) return res.status(500).send("This token was not able to be verified or internal error");

            var querry = "SELECT * FROM users_skat WHERE id = ?";

            skat_db.get(querry, [data.id], function(err, ajRows){
                if(ajRows)return res.status(200).send(JSON.stringify({'debt': ajRows.debt, 'message': 'Authorized'}));
                return res.status(500).send(JSON.stringify({'debt':null,'message': 'No user has been found in the db with that id.'}));
        });
    });
};