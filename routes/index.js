const express = require('express'),
      router = express.Router(),
      indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.index);
router.get('/login', indexController.login);
router.post('/login', indexController.log);
router.post('/register', indexController.register);
router.post('/logout', indexController.logout);
router.get('/users', indexController.users);
module.exports = router;
