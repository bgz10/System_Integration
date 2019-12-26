// Imports.
// ################################################
const express = require('express');
const app = express();
const router = express.Router();

// Routes.
// ################################################

router.get('/',require('./routes/index.js'));
router.get('/signup',require('./routes/signup.js'));


// Server instantiation.
// ################################################
app.use('/', router);
app.listen('80', function(err){
    if(err){
        console.log('An error has occured'); return; 
    }
    console.log("Server is listening on port 80");
});