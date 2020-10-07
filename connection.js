var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "17031991AE#",
    database: 'Inventory'
});

if (con.state != 'connected') {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
}
module.exports = con;