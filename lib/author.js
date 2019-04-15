var db = require('./db');
var template = require('./template');
var qs = require('querystring');
var url = require('url');

var main_table = "test_table";
var join_table = "author_join_test";
exports.home = function (request, response) {
    db.query(`select * from ${main_table}`, function (error, topic) {
        if (error) {
            throw error;
        }
        db.query(`select * from ${join_table}`, function (error, author) {
            if (error) {
                throw error;
            }
            var title = "author";
            var list = template.list(topic);
            var html = template.html(title, list,
                `
                    ${template.authorTable(author)}
                    <style>
                        table{
                            border-collapse:collapse;
                        }
                        td{
                            border:1px solid black;
                        }
                    </style>
                    <form action = "author_create_process" method = "post">
                        <p>
                            <input type = "text" name = "name" placeholder = "name">
                        </p>
                        <p>
                            <textarea name="profile" placeholder = "profile"></textarea>
                        </p>
                        <p>
                            <input type = "submit">
                        </p>
                    </form>
                `,
                `
                    
                `);
            response.writeHead(200); // 성공적으로 전송됨
            response.end(html);
        });
    });
}

exports.create_process = function (request, response) {
    var body = '';
    // 정보 수신 받을 때 마다 실행 됨
    request.on('data', function (data) {
        body = body + data;
    });
    // 정보 수신이 끝나면 실행
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`
                INSERT INTO ${join_table} (name, profile) 
                VALUES(?, ?);`, [post.name, post.profile],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, {
                    Location: `/author`
                }); // 리 다이렉션
                response.end("good");
            }
        );
    });
}

exports.update = function (request, response) {
    db.query(`select * from ${main_table}`, function (error, topic) {
        if (error) {
            throw error;
        }
        db.query(`select * from ${join_table}`, function (error, author) {
            if (error) {
                throw error;
            }
            var title = "author";
            var list = template.list(topic);
            var _url = request.url; // 요청한 url
            var queryData = url.parse(_url, true).query; // url에 보낸 데이터
            var html = template.html(title, list,
                `
                    ${template.authorTable(author)}
                    <style>
                        table{
                            border-collapse:collapse;
                        }
                        td{
                            border:1px solid black;
                        }
                    </style>
                    <form action = "author/update_process" method = "post">
                        <p>
                            <input type = "hidden" name = "id" value = ${queryData.id}>
                        </p>
                        <p>
                            <input type = "text" name = "name" value = >
                        </p>
                        <p>
                            <textarea name="profile" placeholder = "profile"></textarea>
                        </p>
                        <p>
                            <input type = "submit">
                        </p>
                    </form>
                `,
                `
                    
                `);
            response.writeHead(200); // 성공적으로 전송됨
            response.end(html);
        });
    });
}

exports.update_process = function (request, response) {
    var body = '';
    // 정보 수신 받을 때 마다 실행 됨
    request.on('data', function (data) {
        body = body + data;
    });
    // 정보 수신이 끝나면 실행
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`
                update ${join_table} set name = ?, profile = ? 
                where (author_id = ?);`, [post.name, post.profile, post.id],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, {
                    Location: `/author}`
                }); // 리 다이렉션
                response.end("good");
            });
        console.log(post);
        // 사용자가 쓴 내용을 파일로 저장함
    });
}