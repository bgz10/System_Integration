var fs = require('fs');
var csv = require('csv-parser');

try {  
    var data = fs.readFileSync('data.txt', 'utf8');
    let text = data.split('\n')                         // split lines
             .map(line => line.split(/\s+/).join(','))  // split spaces then join with ,
             .join('\n');                               // rejoin lines 

    fs.writeFile("result.csv", text, (err) => {
        if (err) console.log(err);
            console.log("Successfully Written to File.");
    });           
} catch(e) {
    console.log('Error:', e.stack);
}
