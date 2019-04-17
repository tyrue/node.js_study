var express = require('express');
var topic = require('../lib/topic');
var router = express.Router();

router.get('/', function (request, response) {
    // 홈 화면
    if (request.query.id === undefined)
        topic.home(request, response);
    else
        topic.page(request, response);
});

router.get('/create',                  (request, response) => topic.create(request, response));
router.post('/create_process',         (request, response) => topic.create_process(request, response));
router.get('/update',                  (request, response) => topic.update(request, response));
router.post('/update_process',         (request, response) => topic.update_process(request, response));
router.post('/delete_process',         (request, response) => topic.delete_process(request, response));
router.get('/author',                  (request, response) => author.home(request, response));
router.post('/author_create_process',  (request, response) => author.create_process(request, response));
router.get('/author/update',           (request, response) => author.update(request, response));
router.post('/author/update_process',  (request, response) => author.update_process(request, response));
router.post('/author/delete_process',  (request, response) => author.delete_process(request, response));

module.exports = router;