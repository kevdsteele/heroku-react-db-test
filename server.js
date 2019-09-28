const express = require("express");
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require("mongoose");
const passport = require ("./passport")
const app = express();
const PORT = process.env.PORT || 3001;

const routes = require("./routes");

// Define middleware here
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

app.use(bodyParser.json())

// Serve up static assets (usually on heroku)

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))
  }


  // Sessions
app.use(
	session({
		secret: 'keyboard cat', //pick a random string to make the hash that is generated secure

		resave: true, //required
		saveUninitialized: true//required
	})
)



// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

//Express Messages 

app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/greenpoint');

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
