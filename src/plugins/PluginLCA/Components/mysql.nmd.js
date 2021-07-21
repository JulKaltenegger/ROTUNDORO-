//Connect to MySQL

const mysql = require('mysql');

// nmd
// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'sd87634l/&%dsla6SFo776o/(&doz',
  database: 'nmd'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//Query eeec table from MySQL
con.query('SELECT * FROM eeec', (err,rows) => {
  if(err) throw err;

  // console.log('Data received from Db:');
  console.log(rows);
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});