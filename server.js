//Require Express
const express = require("express");
//Require Mongoose
const mongoose = require("mongoose");
//Initialise Express
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require("./routes");

//Add Port
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost/coolbeans"

//Connect to Mongo DB
mongoose.connect(mongoUrl);

app.use(session({
  store: new MongoStore({
      url: mongoUrl
  }),
  secret: "sssshhhh",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 10 * 60 * 60 * 24
  }
}));

app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
