module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    personid: {
      type: DataTypes.STRING(15)
    },
    firstName: {
      type: DataTypes.STRING
    },
    birthday: {
      type: DataTypes.DATEONLY
    },
    maritalstatus: {
      type: DataTypes.ENUM,
      values: ['married', 'single']
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    phone: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    }, 
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },
    {
    paranoid: true,
    underscored: true
  });

  return User;
};
