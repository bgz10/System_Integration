// Imports.
// ################################################
const express = require('express');
const app = express();
app.use(express.json());


// Routes.
// ################################################
app.get('/', require('./routes/index.js'));
app.post('/signup', require('./routes/signup.js'));
app.post('/login', require('./routes/login.js'));

// Server instantiation.
// ################################################

app.listen('80', function(err){
    if(err){
        console.log('An error has occured'); return; 
    }
    console.log("Server is listening");
});