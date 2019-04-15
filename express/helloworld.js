const express = require('express'); // 상수화
const app = express();  // 상수화

app.get('/', (req, res) => res.send('hello world!'));
app.get('/page', (req, res) => res.send('page'));
app.listen(3000, () => console.log("express app listening on port 3000"));