let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app').server;
let Usuarios = require('../models/user');
let should = chai.should();
chai.use(chaiHttp);

describe('Login', function() {
  it('Deberia poder crear un usuario si tiene todos los campos', (done)=>{
    let user = {
        nombre: "Hector",
        email: "email@email",
        password: "kek"
    }
    chai.request(server)
    .post('/register')
    .send(user)
    .end((err, res)=>{
      if(err)
        throw err;
      res.should.be(true);
      done();
    });
  });
  it('No deberia dejar crear usuario si no  tiene email o contraseña',(done)=>{
    let user = {
        nombre: "Hector",
        email: "email@email"
    }
    chai.request(server)
    .post('/register')
    .send(user)
    .end((err, res)=>{
      res.should.be(true);
      done();
    });
  });
  it('No deberia dejar loggear sin las credenciales correctas',(done)=>{
    let user = {
        email: "kek@kek",
        password: "kk"
    }
    chai.request(server)
    .post('/login')
    .send(user)
    .end((err, res)=>{
      res.should.be(true);
      done();
    });
  });
  it('No deberia ver los usuarios sin estar loggeado',(done)=>{
    chai.request(server)
    .get('/users')
    .end((err, res)=>{
      res.should.be(true);
      done();
    });
  });
  it('Deberia dejar loggear con las credenciales correctas',(done)=>{
    let user = {
        email: "kek@kek",
        password: "kek"
    }
    chai.request(server)
    .post('/login')
    .send(user)
    .end((err, res)=>{
      res.should.be(true);
      done();
    });
  });
  it('Deberia ver los usuarios estando loggeado',(done)=>{
    chai.request(server)
    .get('/users')
    .end((err, res)=>{
      res.should.be(true);
      done();
    });
  });
  });
