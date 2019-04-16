// 모듈 호출
var topic = require('./lib/topic');
var author = require('./lib/author');
var bodyParser = require('body-parser');

// express
const express = require('express'); // 상수화
const app = express(); // 상수화
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function (request, response) {
    // 홈 화면
    if (request.query.id === undefined)
        topic.home(request, response);
    else
        topic.page(request, response);
});
app.get('/create',                  (request, response) => topic.create(request, response));
app.post('/create_process',         (request, response) => topic.create_process(request, response));
app.get('/update',                  (request, response) => topic.update(request, response));
app.post('/update_process',         (request, response) => topic.update_process(request, response));
app.post('/delete_process',         (request, response) => topic.delete_process(request, response));
app.get('/author',                  (request, response) => author.home(request, response));
app.post('/author_create_process',  (request, response) => author.create_process(request, response));
app.get('/author/update',           (request, response) => author.update(request, response));
app.post('/author/update_process',  (request, response) => author.update_process(request, response));
app.post('/author/delete_process',  (request, response) => author.delete_process(request, response));
// requst : 요청할 때 보내는 정보
// response : 응답할 때 보내는 정보
// 브라우저에 들어올 때 마다 보냄
app.listen(3000, () => console.log("express app listening on port 3000"));