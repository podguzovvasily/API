const should = require('should'),
supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
var assert = require('assert');
db = require('../server/config/db.js');
router = require('../server/router/index');
const app = express();
router(app, db);

describe('GET /users', function() {
  it('respond with json', function() {
    return request(app)
      .get('/users/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
          (response.body.personid, '1')
      })
  });
});

describe('GET /users', function() {
  it ('should return valid user data for user 1',
  function (done) {

    supertest(app)
    .get('/users/2')
    .expect(200)
    .end(function (err, res) {
      res.status.should.equal(200);
      done();
    });

  });

    it('should return an error for an invalid user', 
    function (done) {

      supertest(app)
      .get('/users/12555555')
      .expect(404)
      .end(function (err, res) {
        res.status.should.equal(404);
      })
      done();
    });
    
  });
