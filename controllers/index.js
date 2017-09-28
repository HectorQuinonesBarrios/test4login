const express = require('express');

function login(req, res, next){
 res.render('login');
}

module.exports = {
  login
}
