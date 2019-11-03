const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const card = jwt.sign(
        { 
            "first_name": "Angela",
            "last_name": "Mckulikin",
            "school": "KEA"
        }, 'some-secret');
        
        return res.status(200).send(card);

        // jwt.verify(card, 'some-secret', (err, data) =>{
        //     if(err) return res.status(500).send("This was not able to be verified or internal error");
        //     console.log(data);
        //     return res.status(200).send("Welcome... Door is ope for you");
        // });

};