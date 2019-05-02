// 모듈 호출
var topicRouter = require('./routers/topic');
var authorRouter = require('./routers/author');
var session = require('express-session') // npm i -s express-session
var FileStore = require('session-file-store')(session) // npm i -s session-file-store

// express
const express = require('express'); // 상수화
const app = express(); // 상수화

app.use(express.urlencoded({
    extended: false
})); // bodyparser
app.use(session({
    secret: 'keyboard cat', // 필수 옵션, 
    resave: false, // 값이 변하기 전까지는 새로 저장 안함
    saveUninitialized: true, // 세션이 필요하기 전까지 구동하지 않음
    store: new FileStore() // 파일 저장, 코드가 있는 디렉토리에 session 폴더를 만들고 거기에 저장함
}));
app.use('/', topicRouter);
app.use('/', authorRouter);

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

// requst : 요청할 때 보내는 정보
// response : 응답할 때 보내는 정보
// 브라우저에 들어올 때 마다 보냄
app.use((req, res, next) => res.status(404).send('Sorry not find'));
app.listen(3000, () => console.log("express app listening on port 3000"));