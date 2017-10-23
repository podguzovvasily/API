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

  it('checking that initial data was created', function() {
    return supertest(app)
      .get('/users/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
          expect(response.body.id).toEqual(1)
          expect(response.body.firstName).toEqual('John')
      })
  });
});


  it('checking that user is not exist', function() {
    return supertest(app)
      .get('/users/1546454')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
          expect(response.body).toBeNull();
    })
});

  fit('checking that value must match the regular expression', function() {
    return supertest(app)
      .get('/users/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body.firstName).toMatch('Ivan')
  })
});

  it('return 204 if user was deleted', function() {
    return supertest(app)
      .delete('/users/4')
      .set('Accept', 'application/json')
      .expect(204) 
}); 
