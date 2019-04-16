var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser');

var main_table = "test_table";
var join_table = "author_join_test";
exports.home = function (request, response) {
    db.query(`select * from ${main_table}`, function (error, topic) {
        if (error) {
            throw error;
        }
        var title = "Welcome";
        var data = "Hello, Node.js";
        var list = template.list(topic);
        var html = template.html(title, list, `<h2>${title}</h2>${data}`,
            `<a href = "/create">create</a>`);

        response.writeHead(200); // 성공적으로 전송됨
        response.end(html);
    });
}

exports.page = function (request, response) {
    var _url = request.url; // 요청한 url
    var queryData = url.parse(_url, true).query; // url에 보낸 데이터
    var q_id = queryData.id; // 데이터중 id 값
    db.query(`select * from ${main_table}`, function (error, topic, fields) {
        if (error) {
            throw error;
        }
        var list = template.list(topic);
        db.query(`select * from ${main_table} left join ${join_table} on ${main_table}.author_id = ${join_table}.author_id 
        where ${main_table}.id = ?`, [q_id], function (error, topic, fields) {
            if (error) {
                throw error;
            }
            console.log(topic);
            var title = topic[0].title;
            var html = template.html(title, list,
                `
                    <h2>${sanitizeHtml(title)}</h2>
                    ${sanitizeHtml(topic[0].description)}
                    <p>by ${sanitizeHtml(topic[0].name)}</p>
                `,
                `
                    <a href = "/create">create</a> 
                    <a href = "/update?id=${topic[0].id}">update</a>
                    <form action = "delete_process" method="post">
                        <input type = "hidden" name = "id" value = "${topic[0].id}">
                        <input type = "submit" value = "delete">
                    </form>
                `);
            response.writeHead(200); // 성공적으로 전송됨
            response.end(html);
        });
    });
}

exports.create = function (request, response) {
    db.query(`select * from ${main_table}`, function (error, topics, fields) {
        if (error) {
            throw error;
        }
        db.query(`select * from ${join_table}`, function (error, authors, fields) {
            if (error) {
                throw error;
            }
            console.log(authors);
            var title = "Web - create";
            var list = template.list(topics);
            var html = template.html(title, list,
                `
                <form action="/create_process" method="POST"> <!-- 데이터를 서버로 보낼 때는 post로-->
                <p><input type="text" name = "title" placeholder = "title"></p>
                <p>
                    <textarea name="description" placeholder = "description"></textarea>
                </p>
                <p>
                    ${template.authorSelect(authors)}
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
            `,
                `<a href = "/create">create</a>`);
            response.writeHead(200); // 성공적으로 전송됨
            response.end(html);
        });
    });
}

exports.create_process = function (request, response) {
    var post = request.body;
    db.query(`
            INSERT INTO ${main_table} (title, description, author_id) 
            VALUES(?, ?, ?);`, [sanitizeHtml(post.title), sanitizeHtml(post.description), post.author],
        function (error, result) {
            if (error) {
                throw error;
            }
            response.writeHead(302, {
                Location: `/?id=${result.insertId}`
            }); // 리 다이렉션
            response.end("good");
        }
    );
}

exports.update = function (request, response) {
    var _url = request.url; // 요청한 url
    var queryData = url.parse(_url, true).query; // url에 보낸 데이터
    var q_id = queryData.id; // 데이터중 id 값

    db.query(`select * from ${main_table}`, function (error, topic, fields) {
        if (error) {
            throw error;
        }
        var list = template.list(topic);
        db.query(`select * from ${main_table} where id = ${q_id}`, function (error, topic, fields) {
            if (error) {
                throw error;
            }
            db.query(`select * from ${join_table}`, function (error, authors, fields) {
                if (error) {
                    throw error;
                }
                var title = topic[0].title;
                var html = template.html(title, list, ``,
                    ` 
                    <form action="/update_process" method="POST"> <!-- 데이터를 서버로 보낼 때는 post로-->
                    <input type="hidden" name = "id" value="${topic[0].id}">
                    <p><input type="text" name = "title" placeholder = "title" value="${topic[0].title}"></p>
                    <p>
                        <textarea name="description" placeholder = "description">${topic[0].description}</textarea>
                    </p>
                    <p>
                        ${template.authorSelect(authors, topic[0].author_id)}
                    </p>
                    <p>
                        <input type="submit" value = "update">
                    </p>
                    </form>`);
                response.writeHead(200); // 성공적으로 전송됨
                response.end(html);
            });
        });
    });
}

exports.update_process = function (request, response) {
    var post = request.body;
    db.query(`
            update ${main_table} set title = ?, description = ?, author_id = ? 
            where (id = ?);`, [sanitizeHtml(post.title), sanitizeHtml(post.description), post.author, post.id],
        function (error, result) {
            if (error) {
                throw error;
            }
            response.writeHead(302, {
                Location: `/?id=${post.id}`
            }); // 리 다이렉션
            response.end("good");
        });
    console.log(post);
    // 사용자가 쓴 내용을 파일로 저장함
}

exports.delete_process = function (request, response) {
    var post = request.body;
    db.query(`delete from ${main_table} where (id = ?);`, [post.id], function (error, result) {
        if (error) {
            throw error;
        }
        console.log(post);
        response.writeHead(302, {
            Location: `/`
        }); // 리 다이렉션
        response.end("good");
    });
}