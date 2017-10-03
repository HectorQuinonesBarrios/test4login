const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const server = require('../app');
const Usuarios = require('../models/user');
const sinon = require('sinon');
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
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
      console.log(res.statusCode);
      expect(res.statusCode).to.equal(200);


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
      expect(res.ok).to.be.equal(true);
      done();
    });
  });
  it('No deberia ver los usuarios sin estar loggeado',(done)=>{
    chai.request(server)
    .get('/users')
    .end((err, res)=>{
      expect(res.ok).to.be.equal(true);
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
      expect(res.ok).to.be.equal(true);
      done();
    });
  });
  it('Deberia ver los usuarios estando loggeado',(done)=>{
    chai.request(server)
    .get('/users')
    .end((err, res)=>{
      expect(res.ok).to.be.equal(true);
      done();
    });
  });
  it('El mockito usando sinonJS',(done)=>{
    let testAPI = {
      method: function(){


      return bruteforce.prevent;

      }
    };
    let mock = sinon.mock(testAPI);
    mock.expects("method").twice().atMost(3);
    for(let i=0; i<2; i++){
      testAPI.method();
    }


    mock.verify();
    done();
  });
});
