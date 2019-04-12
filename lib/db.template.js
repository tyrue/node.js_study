var mysql = require('mysql');
// mysql db 커넥트
var db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});
db.connect();
module.exports = db;