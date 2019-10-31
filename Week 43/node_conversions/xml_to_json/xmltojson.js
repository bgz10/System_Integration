const convert = require('xml-js');
const xml = require('fs').readFileSync('data.xml', 'utf8');
const fs = require('fs');

// xml to json
let result = convert.xml2json(xml, {compact: true, spaces: 4});
fs.writeFile('result.json', result, function(err){
    console.log("Content processed!")
  });