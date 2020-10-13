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
async function getUserById(id) {
  await UserModel.findById(id)
}

//@desc Finding user by its username
async function getUserByUsername(username) {
  await UserModel.findOne({username: new RegExp('^'+username+'$', "i")})
}

//@desc Adding a new user to the database
async function addUser(newUser) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) return err
      newUser.password = hash
    })
  })
  await newUser.save()
}

//@desc Comparing passwords
function comparePassword(password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if(err) throw err
    callback(null, isMatch)
  })
}

module.exports = {
  UserModel, 
  getUserById,
  getUserByUsername,
  addUser,
  comparePassword,
}