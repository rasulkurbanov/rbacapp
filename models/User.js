const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
})

UserSchema.plugin(uniqueValidator)



const UserModel = mongoose.model('UserModel', UserSchema)

//@desc Finding user by its ID
function getUserById(id, callback) {
  UserModel.findById(id, callback);
}

//@desc Find the user by Its username
function getUserByUsername(username, callback) {
  const query = {
      username: username
  }
  UserModel.findOne(query, callback);
}

// @desc Register the user
function addUser(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

// @desc Compare Password
function comparePassword(password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
  });
}

module.exports = {
  UserModel, 
  getUserById,
  getUserByUsername,
  addUser,
  comparePassword,
}