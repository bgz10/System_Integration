const path = require('path');

module.exports = (req, res) =>{
    return res.status(200).sendFile(path.join(__dirname + '/../HTML/index.html'));
}