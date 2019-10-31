const csv = require('csv-parser');
const fs = require('fs');
const builder = require('xmlbuilder');

var root = builder.create('rows');

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
      root.ele('row').ele(data);
  })
  .on('end', () => {
    var xml = root.end({ pretty: true});
    fs.writeFile('result.xml', xml, function(err){
      console.log("Content processed!")
    });
  });