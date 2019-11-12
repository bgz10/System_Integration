const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const bank_db =  new sqlite3.Database('../bank/data/bank.sqlite');

module.exports = (req, res) =>{
    console.log("Somebody wants to make a withdraw...");
    var token = req.body.access_token;
    var amount = req.body.amount;
    var secret = 'secret';

    jwt.verify(token, secret, (err, data) =>{
            if(err) return res.status(500).send("This token was not able to be verified or internal error");
            // Check the amount versus the balance.
            var querry = "SELECT * FROM users_bank WHERE id = ?";
            bank_db.get(querry, [data.id], function(err, ajRows){
                if(err) return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                if(ajRows.balance < amount)
                {   
                    console.log("Hey"); 
                    return res.status(502).send(JSON.stringify({'balance': ajRows.balance,'amount': amount, 'message': 'Not enough money in the account...'}));
                }            
                var sQuery = "UPDATE users_bank SET balance = balance - ? WHERE id= ?";
            var aData = [amount, data.id];
            bank_db.run(sQuery, aData, function(err) {
                if(err) return res.status(500).send("There has been an error. We were not able to retrieve your info.");
            });
            var querry = "SELECT * FROM users_bank WHERE id = ?";
            bank_db.get(querry, [data.id], function(err, ajRows){
                if(err) return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                console.log(ajRows);
                if(ajRows)return res.status(200).send(JSON.stringify({'balance': ajRows.balance, 'amount': amount, 'message': 'Processed'}));
                return res.status(500).send(JSON.stringify({'balance':null,'message': 'No user has been found in the db with that password'}));
            });
        });
    });
};