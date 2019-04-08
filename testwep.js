var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    if(pathname === '/')
    {
        
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
        var template = `<!DOCTYPE html>
        <html>
        
        <head>
            <title>${title}</title>
            <meta charset="utf-8" />
        </head>
        
        <body>
            <a href = "/">WEB</a>
            <ul>
                <li> <a href="/?id=HTML">html</a> </li>
                <li> <a href="/?id=css">css</a> </li>
                <li> <a href="/?id=Java">Java</a> </li>
            </ul>
            <h1>안녕</h1>
            <p>${data}</p>
        </body>
        
        </html>`;
        response.end(template);
    });
});
app.listen(3000);