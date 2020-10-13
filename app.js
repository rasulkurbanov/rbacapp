const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5500

//@desc Importing config object from config folder
const config = require('./config/database')

//@desc Importing users router
const users = require('./routes/users')

//@desc Connecting to MongoDB rbac_based_app database
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log(`Successfully connected to the database`))
  .catch((err) => console.log(err))

//@desc Defining middlewares
app.use(cors())

//@desc Setting static folder
app.use(express.static(path.join(__dirname, 'public')))

//@desc Bodyparser middleware
app.use(bodyParser.json())

//@desc Setting Passwort middleware
app.use(passport.initialize())
app.use(passport.session())



app.get('/', (req, res) => res.send({"greeting": "Assalomu alaykum"}))

app.use('/api/users', users)

//@descListening for the PORT 
app.listen(PORT, () => console.log(`Server running PORT on ${PORT}`))










// @desc  GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
