// 모듈 호출
var topicRouter = require('./routers/topic');

// express
const express = require('express'); // 상수화
const app = express(); // 상수화

app.use(express.urlencoded({ extended: false })); // bodyparser
app.use('/', topicRouter);
// requst : 요청할 때 보내는 정보
// response : 응답할 때 보내는 정보
// 브라우저에 들어올 때 마다 보냄
app.use((req, res, next) => res.status(404).send('Sorry not find'));
app.listen(3000, () => console.log("express app listening on port 3000"));