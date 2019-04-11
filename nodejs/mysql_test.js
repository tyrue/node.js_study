var mysql = require('mysql');
var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'test'
    }
);

connection.connect();

connection.query('select * from test_table', function(error, result, fields){
    if(error){
        console.log(error)
    }
    console.log(result);
});

connection.end();