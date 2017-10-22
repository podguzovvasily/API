const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
db = require('../server/config/db.js');
router = require('../server/router/index');
const app = express();
router(app, db);

describe('GET /users', function() {
  it('respond with json', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
          assert(response.body.personid, '1')
      })
  });
});