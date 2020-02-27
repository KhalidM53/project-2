// Requiring necessary npm packages
const express = require('express')
const session = require('express-session')
// Requiring passport as we've configured it
const passport = require('./config/passport')

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080
const db = require('./models')

// Create express app and configure middleware needed for authentication
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Use sessions to keep track of the users login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// Requiring routes
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)

// Syncing database and logging message
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ', PORT)
  })
})
