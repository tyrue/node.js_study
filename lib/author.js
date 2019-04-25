var db = require('./db');
var template = require('./template');
var url = require('url');
var sanitizeHtml = require('sanitize-html');
var login = require('./login');

var main_table = "test_table";
var join_table = "author_join_test";

var authData = {
    email: "khd@naver.com",
    password: "1111",
    nickname: "doo"
}

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
                            <input type = "submit" value = "create">
                        </p>
                    </form>
                `, ``, login.StatusUI(request, response));
            response.writeHead(200); // 성공적으로 전송됨
            response.end(html);
        });
    });
}

exports.create_process = function (request, response) {
    var post = request.body;
    db.query(`
            INSERT INTO ${join_table} (name, profile) 
            VALUES(?, ?);`, [sanitizeHtml(post.name), sanitizeHtml(post.profile)],
        function (error, result) {
            if (error) {
                throw error;
            }
            response.redirect('/author');
            response.end("good");
        }
    );
}

exports.update = function (request, response) {
    db.query(`select * from ${main_table}`, function (error, topic) {
        if (error) {
            throw error;
        }
        db.query(`select * from ${join_table}`, function (error, authors) {
            if (error) {
                throw error;
            }
            var _url = request.url; // 요청한 url
            var queryData = url.parse(_url, true).query; // url에 보낸 데이터
            db.query(`select * from ${join_table} where author_id=?`, [queryData.id], function (error, author) {
                if (error) {
                    throw error;
                }
                var title = "author";
                var list = template.list(topic);
                var html = template.html(title, list,
                    `
                    ${template.authorTable(authors)}
                    <style>
                        table{
                            border-collapse:collapse;
                        }
                        td{
                            border:1px solid black;
                        }
                    </style>
                    <form action = "/author/update_process" method = "post">
                        <p>
                            <input type = "hidden" name = "id" value = ${author[0].author_id}>
                        </p>
                        <p>
                            <input type = "text" name = "name" placeholder = "name" value = ${author[0].name}>
                        </p>
                        <p>
                            <textarea name="profile" placeholder = "profile">${author[0].profile}</textarea>
                        </p>
                        <p>
                            <input type = "submit" value = "update">
                        </p>
                    </form>
                `, ``, login.StatusUI(request, response));
                response.writeHead(200); // 성공적으로 전송됨
                response.end(html);
            });
        });
    });
}

exports.update_process = function (request, response) {
    var post = request.body;
    db.query(`
            update ${join_table} set name = ?, profile = ? 
            where (author_id = ?);`, [sanitizeHtml(post.name), sanitizeHtml(post.profile), post.id],
        function (error, result) {
            if (error) {
                throw error;
            }
            response.redirect('/author');
            response.end("good");
        });
    console.log(post);
    // 사용자가 쓴 내용을 파일로 저장함
}

exports.delete_process = function (request, response) {
    var post = request.body;
    db.query(`delete from ${main_table} where (author_id = ?);`, [post.id], function (error, result) {
        if (error) {
            throw error;
        }
        db.query(`delete from ${join_table} where (author_id = ?);`, [post.id], function (error, result) {
            if (error) {
                throw error;
            }
            console.log(post);
            console.log("delete");
            response.redirect('/author');
            response.end("good");
        });
    });
}

exports.login = function (request, response) {
    var title = "login";
    var html = template.html(title, "",
        `
        <form action = "/author/login_process" method = "post">
            <p>
                <input type = "text" name = "email" placeholder = "email">
            </p>
            <p>
                <input type = "passwrod" name = "pwd" placeholder = "password">
            </p>
            <p>
                <input type = "submit" value = "login">
            </p>
        </form>
        `, ``);
    response.writeHead(200); // 성공적으로 전송됨
    response.end(html);
}

exports.login_process = function (request, response) {
    var post = request.body;
    console.log(post);
    var email = post.email;
    var password = post.pwd;
    if ((email === authData.email) && (password === authData.password)) {
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        request.session.save();
        response.redirect('/');
        return false;
    } else {
        response.send('NO');
        return false;
    }
}

exports.logout_process = function (request, response) {
    console.log("logout");
    request.session.destroy(function (err) {
        response.redirect('/');
        return false;
    });
}