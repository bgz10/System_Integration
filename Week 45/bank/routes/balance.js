const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const bank_db =  new sqlite3.Database('../bank/data/bank.sqlite');

module.exports = (req, res) =>{
    console.log("Somebody wants to see his/her balance...");
    var token = req.body.access_token;
    var secret = 'secret';

    jwt.verify(token, secret, (err, data) =>{
            if(err) return res.status(500).send("This token was not able to be verified or internal error");

            var querry = "SELECT * FROM users_bank WHERE id = ?";

            bank_db.get(querry, [data.id], function(err, ajRows){
                if(ajRows)return res.status(200).send(JSON.stringify({'balance': ajRows.balance, 'message': 'Authorized'}));
                return res.status(500).send(JSON.stringify({'balance':null,'message': 'No user has been found in the db with that password'}));
        });
    });
};