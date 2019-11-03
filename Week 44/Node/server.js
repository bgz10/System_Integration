// Imports.
// ################################################
const express = require('express');
const app = express();


// Routes.
// ################################################
app.get('/', require('./routes/index.js'))
app.get('/identify', require('./routes/identify.js'));

// Server instantiation.
// ################################################

app.listen('80', function(err){
    if(err){
        console.log('An error has occured'); return; 
    }
    console.log("Server is listening");
});