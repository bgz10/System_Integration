const sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('data.db');

// Select Statement
db.all("SELECT * FROM users", function(err, ajRows){
    console.log('**********************')
    console.log('select this is: ', this)
    console.log(ajRows)
    ajRows.forEach( jRow => {
        console.log( jRow.id);
      });
});

// Update Statement
var sQuery = "UPDATE users SET name = ? WHERE id= ?";
var aData = [ 'B' , '1234'];
db.run( sQuery , aData , function(err) {
  console.log('**********');
  console.log( 'update this is : ' ,  this );
});

// Insert Statement
var aData = [ '2', 'John', 'message', '1' ] // more values ['X','Y','Z']
var sQuery = "INSERT INTO users VALUES(?, ?, ? ,?)" // more values VALUES(?, ?, ?)
db.run( sQuery , aData , function( err ){
  console.log('**********');
  console.log( 'insert this is : ' ,  this );
  // this contains: { sql: 'INSERT INTO users VALUES(?,?)', lastID: 2, changes: 1 }
});

// Delete Statement
var sQuery = "DELETE FROM users WHERE name  = ?"
var aData = ['B']
db.run( sQuery , aData , function( err ){
  console.log('**********');
  console.log('DELETE');
  console.log( this )// { sql: 'DELETE FROM users WHERE name  = ?', lastID: 6, changes: 1 }
});
