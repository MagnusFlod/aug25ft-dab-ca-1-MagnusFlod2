// All necessary imports
const session = require('express-session');
const passport = require('passport');
// Declaring the variable for connecting sequelize to the database
const db = require('./models');
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Making routing possible to the different tables/importing the different route-files
var indexRouter = require('./routes/index');
var animalsRouter = require('./routes/animals');
var speciesRouter = require('./routes/species');
var populateRouter = require('./routes/populate');
var authRouter = require('./routes/auth');

var app = express();

// Actually connecting and syncronizing the app to the database
db.sequelize.sync()
  // If everything works smoothly, I am logging a success-message
  .then(() => console.log("Database synced"))
  // If there's an error, an error-message occurs
  .catch(err => console.error("Sync Error", err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Making it possible for express to use and render the ejs-files. So the user can actually visit and navigate in the app
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session
({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Using the different route-files
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/animals', animalsRouter);
app.use('/species', speciesRouter);
app.use('/populate', populateRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next)
{
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

