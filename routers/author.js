var express = require('express');
var author = require('../lib/author');
var router = express.Router();

router.get('/author',                  (request, response) => author.home(request, response));
router.post('/author_create_process',  (request, response) => author.create_process(request, response));
router.get('/author/update',           (request, response) => author.update(request, response));
router.post('/author/update_process',  (request, response) => author.update_process(request, response));
router.post('/author/delete_process',  (request, response) => author.delete_process(request, response));
router.get('/author/login',            (request, response) => author.login(request, response));
router.post('/author/login_process',   (request, response) => author.login_process(request, response));
router.get('/author/logout',          (request, response) => author.logout_process(request, response));

module.exports = router;