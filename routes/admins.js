const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const config = require('../config/database')


//@desc /api/users/register endpoint's router
router.post('/register', (req, res) => {
  let newAdmin = new Admin.AdminModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    job_profile: req.body.job_profile
  })

  Admin.addAdmin(newAdmin, (err, user) => {
    if (err) {
        let message = "";
        if (err.errors.username) message = "Username is already taken. ";
        if (err.errors.email) message += "Email already exists.";
        return res.json({
            success: false,
            message
        });
    } else {
        return res.json({
            success: true,
            message: "Admin registration is successful."
        });
    }
  });
})


// @desc /api/users/login endpoint's router
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //@desc Getting user
  Admin.getAdminByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
          return res.json({
              success: false,
              message: "Admin not found."
          });
      }
      //@desc Comparing sent password to database-inserted password
      Admin.comparePassword(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
              const token = jwt.sign({
                  type: "admin",
                  data: {
                      _id: user._id,
                      username: user.username,
                      name: user.name,
                      email: user.email,
                      contact: user.contact,
                      job_profile: user.job_profile
                  }
              }, config.secret, {
                  expiresIn: 604800 // for 1 week time in milliseconds
              });
              return res.json({
                  success: true,
                  token: "JWT " + token
              });
          } else {
              return res.json({
                  success: true,
                  message: "Wrong Password."
              });
          }
      });
  });
});



router.get('/profile', passport.authenticate('jwt', {session: false}), 
    function(req, res) {
        res.send(req.user)
    }
)



//@desc Exporting user's router
module.exports = router
