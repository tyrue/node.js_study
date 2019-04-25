var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session') // npm i -s express-session
var FileStore = require('session-file-store')(session) // npm i -s session-file-store

var app = express()

app.use(session({
    secret: 'keyboard cat', // 필수 옵션, 
    resave: false,  // 값이 변하기 전까지는 새로 저장 안함
    saveUninitialized: true, // 세션이 필요하기 전까지 구동하지 않음
    store: new FileStore() // 파일 저장, 코드가 있는 디렉토리에 session 폴더를 만들고 거기에 저장함
}))

app.get('/', function (req, res, next) {
    console.log(req.session); // 세션 출력
    if(req.session.o === undefined) // 세션 num이 없으면 생성하고 1로 초기화
    {
        req.session.o = 1;
    }
    else{
        req.session.o += 1;   // 이미 있다면 num에 1증가
    }
    res.send(`Views : ${req.session.num} o : ${req.session.o}`); // 브라우저에 세션 num 출력
})

app.listen(3000, function () {
    console.log('3000!');
});