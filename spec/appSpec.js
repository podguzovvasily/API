const should = require('should'),
supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
var assert = require('assert');
db = require('../server/config/db.js');
router = require('../server/router/index');
const app = express();
router(app, db);

/*describe('GET /users', function() {
  fit('respond with json', 
  function (done) {
    supertest(app)
      .get('/users/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        assert(response.body.personid, '2')
        done();
      })
  });
});*/

describe('GET /users', function() {

  it('checking that data was created', function() {
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

it('checking that data was created', function() {
  return supertest(app)
    .get('/users/1546')
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
        expect(response.body.toBeNull).toBeNull()
    })
});

  it('return 204 if user was deleted or not exist', function() {
    return supertest(app)
      .delete('/users/4')
      .set('Accept', 'application/json')
      .expect(204) 
});

  fit('return 200 on put', function() {
    return supertest(app)
      .post('/users/')
      .set('Accept', 'application/json')
      .expect(200)
      .then(request => {
        {
          response.body.firstName = 'John'
        }
      })
   
});

// it('return 204 if user was deleted', function() {
//   return supertest(app)
//     .patch('/users/4')
//     .set('Accept', 'application/json')
//     .expect(204)
   
// });





// describe('GET /users by id', function() {
//   // it ('should return valid user data for user 1',
//   // function (done) {

//   //   supertest(app)
//   //   .get('/users/2')
//   //   .expect(200)
//   //   .end(function (err, res) {
//   //     res.status.should.equal(200);
//   //     done();
//   //   });

//   // });

//     fit('should return an error for an invalid user', function () {
//       return supertest(app)
//       .get('/users/12555555')
//       .expect(404)
//       .end(function (err, res) {
//         //res.status.equal(404);
//       })
      
//     });
    
//   });
