const express = require('express');
const Usuario = require('../models/user');
function index(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
      res.redirect('/login');
    } else {
      res.render('index', {nombre: usuario.nombre});
    }
  });
}

function login(req, res, next) {
  Usuario.findOne({_id: req.session.usuario}, (err, usuario) => {
    if (!usuario) {
        res.render('login');
    } else {
      res.redirect('/');
    }
  });
}

function log(req, res, next) {
    Usuario.findOne({
        "email": req.body.email
    }, (err, user) => {
        if(err){
          //TODO
          console.log("todo mal");
          res.redirect("/");
        } else {
          if(user){
            if(req.body.password == user.password){
              console.log("todo bien", user);
              req.session.usuario = user._id;
              res.redirect("/");
            } else {
              console.log("Contraseña incorrecta");
              res.redirect("/login");
            }
          } else {
            console.log("usuario no encontrado");
            res.redirect("/login");
          }
        }
    });
}

function register(req, res, next) {
  console.log(req.body);
    usr = new Usuario({
        nombre : req.body.nombre,
        email : req.body.email,
        password : req.body.password
    });
    usr.save((err, object) => {
        if (err) {
            code = 'danger';
            message = 'Error al crear el usuario';
            logger.debug(err)
        } else {
            code = 'success';
            message = 'Usuario creado correctamente';
        }
        res.locals.status = {
            code,
            message
        };
        res.redirect("/");
    });
}
function logout(req, res, next) {
  req.session.destroy((err) => {
    if(err) console.log(err);
    else res.redirect('/login');
  });
}

module.exports = {
    index,
    login,
    log,
    register,
    logout
}
