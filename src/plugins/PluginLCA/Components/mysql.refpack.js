//Connect to MySQL
const mysql = require('mysql');

export const dbconnect = () => {
    const con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'sd87634l/&%dsla6SFo776o/(&doz',
        database: 'refpackage'
    });
    
 //connect and return the connection to query the db   
    return new Promise (function(resolve, reject) {
        function requcallback (err) {
            if (err) reject (err) 
            else resolve (con) 
        }
        con.connect(requcallback)
    })

}

//query db: function calls query function and return the rows in the db table
export const runquery = (con, query) => {

    return new Promise (function(resolve, reject) {
        function requcallback (err, rows) {
            if (err) reject (err) 
            else resolve (rows) 
        }
        con.query(query, requcallback)
    })
}

export const dbclosed = (con) => {
    con.end((err) => {
    });
}