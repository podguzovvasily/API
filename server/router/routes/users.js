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
        return         
      }     
      return res.json(User);
    })
    
  });

    //GET single user by firstName
    app.get('/users/name/:firstName', function (req, res) {
      db.User.findAll({ where: { firstName: req.params.firstName } }).then((User) => {
        res.json(User);
      });
    });


  // POST single user
  app.post('/users/', function post(req, res) {
    db.User.create({
      personid: req.body.personid,
      firstName: req.body.firstName,
      birthday: req.body.birthday,
      maritalstatus: req.body.maritalstatus,
      yearsOfExperience: req.body.yearsOfExperience,
      skills: req.body.skills,
      phone: req.body.phone,
      lastName: req.body.lastName
    }).then((data) => {
      res.json(data);
      // res.status(201).send();
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
  app.delete('/users/:id', function (req, res) {
    const userId = req.params.id;
    db.User.destroy({ where: { id: userId } }).then(() => {
      console.log(`User with id ${userId} has been deleted or not exist`);
      res.status(204).send();
    });
  });
};
