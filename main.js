// 모듈 호출
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');

// requst : 요청할 때 보내는 정보
// response : 응답할 때 보내는 정보
// 브라우저에 들어올 때 마다 보냄
var app = http.createServer(function (request, response) {
    var _url = request.url; // 요청한 url
    var queryData = url.parse(_url, true).query; // url에 보낸 데이터
    var pathname = url.parse(_url, true).pathname; // url 주소
    
    if (pathname === '/') {
        // 홈 화면
        if (queryData.id === undefined) {
           topic.home(request, response);
        } else {
            topic.page(request, response);
        }
    } else if (pathname === "/create") {
        topic.create(request, response);
    } else if (pathname === "/create_process") {
        topic.create_process(request, response);
    } else if (pathname === "/update") {
        topic.update(request, response);
    } else if (pathname === "/update_process") {
        topic.update_process(request, response);
    } else if (pathname === "/delete_process") {
        topic.delete_process(request, response);
    } else if (pathname === "/author") {
        author.home(request, response);
    } else if (pathname === "/author_create_process") {
        author.create_process(request, response);
    } else if (pathname === "/author/update") {
        author.update(request, response);
    } else if (pathname === "/author/update_process") {
        author.update_process(request, response);
    }
    else {
        response.writeHead(404); // 파일을 찾을 수 없음
        response.end("Not Found");
    }
});
app.listen(3000);