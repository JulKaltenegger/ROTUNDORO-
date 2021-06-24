//Connect to MySQL
const mysql = require('mysql');

// buildingmodel
// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'sd87634l/&%dsla6SFo776o/(&doz',
  database: 'buildingmodel'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//Query wall table from MySQL
con.query('SELECT * FROM wall', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});

//Query roof table from MySQL
con.query('SELECT * FROM roof', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});

//Query floor table from MySQL
con.query('SELECT * FROM floor', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});

// //Query window table from MySQL
// con.query('SELECT * FROM window', (err,rows) => {
//   if(err) throw err;

//   console.log('Data received from Db:');
//   console.log(rows);
// });


 //Query door table from MySQL
 con.query('SELECT * FROM door', (err,rows) => {
   if(err) throw err;

   console.log('Data received from Db:');
   console.log(rows);
 });

 //Query rp table from MySQL
 con.query('SELECT * FROM rp', (err,rows) => {
   if(err) throw err;

   console.log('Data received from Db:');
   console.log(rows);
 });


con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});