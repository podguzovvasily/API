var Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = (app, db) => {
  
  //GET all users
  app.get('/users', function (req, res) {
    db.User.findAll().then((User) => {
      res.json(User);
    });
  });

  //GET single user by id
  app.get('/users/:id', function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then((User) => {
      if (!User) {
        res.status(404).send(); 
        return;         
      }     
      return res.json(User);
    })
    .catch((err) => {
      res.status(500).json({
        message:err.message
    });
  });
});


  //GET single user by firstName
  app.get('/name/:firstName', function (req, res) {
    db.User.findAll({ where: { firstName: { [Op.like]: '%' + req.params.firstName + '%'} }}).then((User) => {
      if (res.body == 'undefined') {
        res.status(404).send(); 
        return;
      }  
      return res.status(200).json(User);
      })
      .catch((err) => {
        res.status(500).json({
          message:err.message
    });
  });
});

  // POST single user
  app.post('/users/', function post(req, res) {
    db.User.create({
      // id: req.body.id,
      personid: req.body.personid,
      firstName: req.body.firstName,
      birthday: req.body.birthday,
      maritalstatus: req.body.maritalstatus,
      yearsOfExperience: req.body.yearsOfExperience,
      skills: req.body.skills,
      phone: req.body.phone,
      lastName: req.body.lastName
    }).then((data) => {
      if (req.body.personid == null || 
          req.body.firstName == null ||
          req.body.birthday == null ||
          req.body.maritalstatus == null ||
          //req.body.yearsOfExperience == null ||
          //req.body.skills == null ||
          //req.body.phone == null ||
          req.body.lastName == null) 
          {
        throw new Error('Not all data is filled out');
      } 
      return res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message:err.message
  });
    });
  });

  // PATCH single user
  app.patch('/users/:id', (req, res) => {
    db.User
      .findOne({
        where: { id: req.params.id }
      })
      .then(User => {
        if (!User) {
          throw new Error('User doesn\'t exist');         
        }
        return User.updateAttributes(req.body)
      })
      .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch((err) => {
        res.status(500).json({
          message:err.message
        });
      });
  });

  //DELETE single user
  app.delete('/users/:id', (req, res) => {
    db.User
    .findOne({
      where: { id: req.params.id }
    })
    .then(User => {
      if (!User) {
        throw new Error('User doesn\'t exist');         
      }
      return db.User.destroy({ where: { id: req.params.id } })
    })
    .then(() => {
      console.log(`User with id ${req.params.id} has been deleted`);
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({
        message:err.message
  });
    });
  });
};
