const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

const AdminSchema = mongoose.Schema({
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
  },
  job_profile: {
    type: String,
    required: true
  }
})

AdminSchema.plugin(uniqueValidator)



const AdminModel = mongoose.model('AdminModel', AdminSchema)

//@desc Finding user by its ID
function getAdminById(id, callback) {
  AdminModel.findById(id, callback);
}

//@desc Find the user by Its username
function getAdminByUsername(username, callback) {
  const query = {
      username: username
  }
  AdminModel.findOne(query, callback);
}

// @desc Register the user
function addAdmin(newAdmin, callback) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin.save(callback);
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
  AdminModel, 
  getAdminById,
  getAdminByUsername,
  addAdmin,
  comparePassword,
}