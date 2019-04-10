var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// requst : 요청할 때 보내는 정보
// response : 응답할 때 보내는 정보
// 브라우저에 들어올 때 마다 보냄
var app = http.createServer(function (request, response) {
    function templateHTML(title, list, body, control) {
        return `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>${title}</title>
            <meta charset="utf-8" />
        </head>
        
        <body>
            <a href = "/">WEB</a>
            ${list}
            ${control}  
            <h1>안녕!</h1>
            ${body}
        </body>
        
        </html>`;
    }

    function templateList(filelist) {
        var list = '<ul>';
        for (i in filelist) {
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        list += '</ul>';
        return list;
    }

    var _url = request.url; // 요청한 url
    var queryData = url.parse(_url, true).query; // url에 보낸 데이터
    var pathname = url.parse(_url, true).pathname; // url 주소
    var title = queryData.id; // 데이터중 id 값

    if (pathname === '/') {
        // 홈 화면
        if (title === undefined) {
            fs.readdir('./data', function (error, filelist) {
                title = "Welcome";
                var data = "Hello, Node.js";

                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2>${data}`,
                    `<a href = "/create">create</a>`);
                response.writeHead(200); // 성공적으로 전송됨
                response.end(template);
            });
        } else {
            // data 폴더에 있는 파일 배열을 filelist에 저장
            fs.readdir('./data', function (error, filelist) {
                // data 폴더에 있는 파일 읽어서 data 변수에 저장    
                fs.readFile(`data/${title}`, 'utf8', function (err, data) {
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${data}`,
                        `<a href = "/create">create</a> 
                        <a href = "/update?id=${title}">update</a>
                        <form action = "delete_process" method="post">
                            <input type = "hidden" name = "id" value = "${title}">
                            <input type = "submit" value = "delete">
                        </form>`);
                    response.writeHead(200); // 성공적으로 전송됨
                    response.end(template);
                });
            });
        }
    } else if (pathname === "/create") {
        fs.readdir('./data', function (error, filelist) {
            title = "Web - create";
            var list = templateList(filelist);
            var template = templateHTML(title, list,
                `
                <form action="/create_process" method="POST"> <!-- 데이터를 서버로 보낼 때는 post로-->
                <p><input type="text" name = "title" placeholder = "title"></p>
                <p>
                    <textarea name="description" placeholder = "description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
            `, ``);
            response.writeHead(200); // 성공적으로 전송됨
            response.end(template);
        });
    } else if (pathname === "/create_process") {
        var body = '';
        // 정보 수신 받을 때 마다 실행 됨
        request.on('data', function (data) {
            body = body + data;
        });
        // 정보 수신이 끝나면 실행
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description

            // 사용자가 쓴 내용을 파일로 저장함
            fs.writeFile(`data/${title}.txt`, description, 'utf8', function (err) {
                response.writeHead(302, {
                    Location: `/?id=${title}`
                }); // 리 다이렉션
                response.end("good");
            });
        });
    } else if (pathname === "/update") {
        // data 폴더에 있는 파일 배열을 filelist에 저장
        fs.readdir('./data', function (error, filelist) {
            // data 폴더에 있는 파일 읽어서 data 변수에 저장    
            fs.readFile(`data/${title}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title, list,
                    `
                    <form action="/update_process" method="POST"> <!-- 데이터를 서버로 보낼 때는 post로-->
                    <input type="hidden" name = "id" value="${title}">
                    <p><input type="text" name = "title" placeholder = "title" value="${title}"></p>
                    <p>
                        <textarea name="description" placeholder = "description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                    </form>
                `,
                    `<a href = "/create">create</a> <a href = "/update?id=${title}">update</a>`);
                response.writeHead(200); // 성공적으로 전송됨
                response.end(template);
            });
        });
    } else if (pathname === "/update_process") {
        var body = '';
        // 정보 수신 받을 때 마다 실행 됨
        request.on('data', function (data) {
            body = body + data;
        });
        // 정보 수신이 끝나면 실행
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;

            fs.rename(`data/${id}`, `data/${title}`, function (error) {
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    response.writeHead(302, {
                        Location: `/?id=${title}`
                    }); // 리 다이렉션
                    response.end("good");
                });
            });
            console.log(post);
            // 사용자가 쓴 내용을 파일로 저장함
        });
    } 
    else if(pathname === "/delete_process")
    {
        var body = '';
        // 정보 수신 받을 때 마다 실행 됨
        request.on('data', function (data) {
            body = body + data;
        });
        // 정보 수신이 끝나면 실행
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(error){
                response.writeHead(302, {
                    Location: `/`
                }); // 홈으로 리 다이렉션
                response.end();
            });
            // 사용자가 쓴 내용을 파일로 저장함
        });
    }
    else {
        response.writeHead(404); // 파일을 찾을 수 없음
        response.end("Not Found");
    }
});
app.listen(3000);