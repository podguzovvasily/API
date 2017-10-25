const express = require('express');
bodyParser = require('body-parser');
supertest = require('supertest');
var assert = require('assert');
db = require('../server/config/db.js');
router = require('../server/router/index');
const app = express();
app.use(bodyParser.json());
router(app, db);


describe('CRUD OPERATIONS /users', function () {

  it('checking that initial data was created', function () {
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

it('checking that user is not exist', function () {
  return supertest(app)
    .get('/users/1546454')
    .set('Accept', 'application/json')
    .expect(404)
});

it('checking that value must match the regular expression', function () {
  return supertest(app)
    .get('/users/1')
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
      expect(response.body.firstName).toMatch('John')
    })
});

it('return 204 if user was deleted', function () {
  return supertest(app)
    .delete('/users/4')
    .set('Accept', 'application/json')
    .expect(204)
});

it('Post single user', function () {
  return supertest(app)
    .post('/users/')
    .send({
      "personid": "XXX-1111-451235",
      "firstName": "John",
      "birthday": "2000-01-01",
      "maritalstatus": "married",
      "yearsOfExperience": 10,
      "skills": [
        "C#",
        ".NET",
        "JavaScript"
      ],
      "phone": "1234567890",
      "lastName": "Hancoock"
    })
    .expect(200)
    .expect('Content-Type', /json/)
});

it('Patch single user', function () {
  return supertest(app)
    .patch('/users/2')
    .send({
      "personid": "XXX-3333-462277",
      "firstName": "Vladimir",
      "birthday": "1987-02-01T21:00:00.000Z",
      "maritalstatus": "married",
      "yearsOfExperience": 3,
      "skills": [
        "Scala",
        "Ruby",
        "JavaScript"
      ],
      "phone": "0974813684",
      "lastName": "Kornev"
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(response => {
      expect(response.body.personid).toMatch('XXX-3333-462277')
      expect(response.body.firstName).toMatch('Vladimir')
      expect(response.body.birthday).toMatch('1987-02-01T21:00:00.000Z')
      expect(response.body.maritalstatus).toMatch('married')
      expect(response.body.yearsOfExperience).toEqual(3)
      expect(response.body.skills).toEqual([
        "Scala",
        "Ruby",
        "JavaScript"
      ])
      expect(response.body.phone).toMatch('0974813684')
      expect(response.body.lastName).toMatch('Kornev')
    })
});
