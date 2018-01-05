'use strict';

var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // email: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address format'
        }
      }
    },
    // Adding password restrictions
    // password: DataTypes.STRING
    password: {
      type: DataTypes.STRING,
      validate: {
        // Length
        len: {
          // Arguments - no less than 6, no more than 32
          args: [6, 32],
          msg: 'Password must be between 6 and 32 characters long'
        }
      }
    }
  }, {
    hooks: {
      //before its added to database, do this action
      beforeCreate: function(pendingUser, options){
        //both must be true, cannot be empty strings
        if(pendingUser && pendingUser.password){
          //creates hash, 10 salt rounds is default
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  user.prototype.isValidPassword = function(passwordTyped){
    return bcrypt.compareSync(passwordTyped, this.password);
  }

  user.prototype.toJSON = function(){
    var user = this.get();
    delete user.password;
    return user;
  }
  return user;
};

