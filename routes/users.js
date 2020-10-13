const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/database')
const bcrypt = require('bcryptjs')



//@desc /api/users/register endpoint's router
router.post('/register', async (req, res) => {
  let newUser = new User.UserModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password
  })

  try {
    await User.addUser(newUser)
    res.status(201).json({success: true, message: "User is successfully added to the database"})
  }
  catch(err) {
    res.status(400).json({success: false, message: err.message})
  }
})


//@desc Exporting users' router
module.exports = router