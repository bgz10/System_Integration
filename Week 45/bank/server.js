// Imports.
// ################################################

const express = require('express');
const app = express();
app.use(express.json());


// Routes.
// ################################################

app.get('/', require('./routes/index.js'))
app.post('/balance', require('./routes/balance.js'));
app.post('/deposit', require('./routes/deposit.js'));
app.post('/withdraw', require('./routes/retrieve.js'));

// Server instantiation.
// ################################################

app.listen('8888', function(err){
    if(err){
        console.log('An error has occured'); return; 
    }
    console.log("Server is listening on port 8888");
});