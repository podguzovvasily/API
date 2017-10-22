const express = require('express'),
  bodyParser = require('body-parser'),
  Jasmine = require('jasmine'),
  morgan = require('morgan'),
  db = require('./server/config/db.js'),
  env = require('./server/config/env'),
  router = require('./server/router/index'),
  cors = require('cors');
  const request = require('supertest');

const app = express();
const PORT = env.PORT;
jasmine = new Jasmine();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

router(app, db);

//drop and resync with { force: true }
db.sequelize.sync({ force: true })
  .then(() => {
    return db.User.bulkCreate([{
      personid: 'XXX-1111-451235',
      firstName: 'John',
      birthday: '2000-01-01',
      maritalstatus: 'married',
      yearsOfExperience: '10',
      skills: ['C#', '.NET', 'JavaScript'],
      phone: '1234567890',
      lastName: 'Hancoock'
    },
    {
      personid: 'XXX-2222-452235',
      firstName: 'Ivan',
      birthday: '1983-01-01',
      maritalstatus: 'married',
      yearsOfExperience: '5',
      skills: ['C#', '.NET', 'Java'],
      phone: '0987654321',
      lastName: 'Ivanov'
    },
    {
      personid: 'XXX-3333-462277',
      firstName: 'Vladimir',
      birthday: '1987-02-02',
      maritalstatus: 'married',
      yearsOfExperience: '3',
      skills: ['Scala', 'Ruby', 'JavaScript'],
      phone: '0974813684',
      lastName: 'Kornev'
    },
    {
      personid: 'XXX-4444-462277',
      firstName: 'Oleg',
      birthday: '1986-04-04',
      maritalstatus: 'married',
      yearsOfExperience: '1',
      skills: ['C#', 'Ruby', 'JavaScript'],
      phone: '0974813685',
      lastName: 'Petrov'
    }]);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Express listening on port:', PORT);
    });
  
    

    app.get('/user/', function(req, res) {
      res.status(200).json({ name: 'tobe' });
    });
     
    request(app)
      .get('/user/')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });