const express = require('express'),
      router = express.Router(),
      indexController = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', indexController.login);

module.exports = router;
