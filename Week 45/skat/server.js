// Imports.
// ################################################

const express = require('express');
const app = express();
app.use(express.json());


// Routes.
// ################################################

app.get('/', require('./routes/index.js'))
app.post('/overview', require('./routes/balance.js'));
app.post('/pay', require('./routes/pay.js'));
app.post('/withdraw', require('./routes/withdraw.js'));

// Server instantiation.
// ################################################

app.listen('8889', function(err){
    if(err){
        console.log('An error has occured'); return; 
    }
    console.log("Server is listening on port 8889");
});