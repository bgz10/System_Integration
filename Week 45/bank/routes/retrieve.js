const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const bank_db =  new sqlite3.Database('../bank/data/bank.sqlite');
const keys_db = new sqlite3.Database('../keys.sqlite');

module.exports = (req, res) =>{

    let pload = req.body.token;
    var query = "SELECT * FROM public_keys WHERE service = ?";
    var amount = req.body.amount;

    keys_db.get(query, ['main'], function(er, ajRows)
    {
        if(er) 
            return res.status(500).send("There has been an error. We were not able to retrieve your info.");

        if(ajRows)
        {
            var verifyOptions = {
                issuer:  "Main Server",
                audience:  "BANK",
                algorithm:  ["RS256"]
            };
    
            jwt.verify(pload, ajRows.key, verifyOptions, (err, payload) =>
            {
                if(err)
                    return res.status(400).send("The payload has been tainted, invalid key or audience");
            
                // Check the amount versus the balance.
                var query = "SELECT * FROM users_bank WHERE id = ?";
                bank_db.get(query, [payload.id], function(err, a){
                if(err) 
                    return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                if(a.balance < amount)
                    return res.status(502).send(JSON.stringify({'balance': a.balance, 'amount': amount, 'message': 'Not enough money in the account...'}));  
                });

                var b_query = "UPDATE users_bank SET balance = balance - ? WHERE id= ?";
                var b_data = [amount, payload.id];
                bank_db.run(b_query, b_data, function(err) 
                {
                    if(err) 
                        return res.status(500).send("There has been an error. We were not able to retrieve your info.");
                });

                b_query = "SELECT * FROM users_bank WHERE id = ?";
                bank_db.get(b_query, [payload.id], function(er, aj)
                {
                    if(er) 
                        return res.status(500).send("There has been an error. We were not able to retrieve your info.");

                    if(aj)
                    {
                        console.log("Success - Withdraw Approved");
                        return res.status(200).send(JSON.stringify({'balance': aj.balance, 'amount': amount, 'message': 'Processed'}));
                    }
                });    

            });
        }
    });
};