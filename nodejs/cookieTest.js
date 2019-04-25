var http = require('http');
var cookie = require('cookie'); // npm i cookie --save

http.createServer(function (req, res) {
    console.log(req.headers.cookie);
    var cookies = {}; // 쿠키를 담을 배열

    // 쿠키가 있다면 쿠키를 사용할 수 있도록 키와 값을 저장함
    if (req.headers.cookie !== undefined) {
        cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies); // 쿠키 출력
    res.writeHead(200, {
        'Set-Cookie': [
            'yum = choco', 
            'tasty = strawberry',
            `permanet = cookies; Max-Age = ${60 * 60* 24}`, // 쿠키 만료 시간, 초 단위
            `secure = secrue; Secure`, // https에만 사용할 수 있음
            `path = path; Path=/cookie`, 
            `Domain = Domain; Domain = kdh.com`
        ]
    });
    res.end('cookie');
}).listen(3000);