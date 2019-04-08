var fs = require('fs');
fs.readFile('txt.txt', 'utf8', function(err, data)
{
    console.log(data);
}
);