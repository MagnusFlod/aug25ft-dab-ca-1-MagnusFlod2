// Neseccary imports
var express = require('express');
// Importing passport since auth.js file routes Login, Session, User-identification and Middelware
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Importing the whole sequelize-model-system with all the tables
var db = require("../models");
const UserService = require("../services/UserService");
var userService = new UserService(db);

// Passport function to ensure username and password are correct
passport.use(new LocalStrategy(async function(username, password, cb)
{
  
  try
  {
    // CRUD-READ. Gets or reads one user specified by the selected username
    const user = await userService.getOneByName(username);

    // If the username OR password is typed in wrong, user authentication fails and an error-message occours
    if (!user || user.password !== password)
    {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    // If username and passwords are correct, login went fine
    return cb(null, user);
  }
  catch (err)
  {
    return cb(err);
  }
}));

// Serialize user so passport remembers that the user is logged in. Like a reference to said user
passport.serializeUser(function(user, cb)
{
    process.nextTick(function()
    {
        // This is the reference to the user that passport uses to remember that the user is logged in
        cb(null,
        {
            // UserId, name and role
            id: user.id,
            username: user.username,
            role: user.role
        });
    });
});

// When a new request is sent, for instance, navigating to a new route destination, deserialize is run and passport reads the session that was created. Finds the user-information
passport.deserializeUser(function(user, cb)
{
  process.nextTick(function()
  {
    return cb(null, user);
  });
});
// Without serialize and deserialize, the user would have to sign in everytime a new request is made. That would be a terrible user-experince

// Making a new router so it can be exported from auth.js and imported in app.js
var router = express.Router();


// When a user navigates to localhost.3000/login, the function checks if a user is logged in
router.get('/login', function(req, res)
{
    const username = req.user?.username;
    // If the user is logged in, the page is rendered with the username in the view
    res.render('login', { user: req.user });
});


// Checks if the login is successfull
router.post('/login/password', passport.authenticate('local',
{
  // If successfull, the user is directed to the front-page(localhost:3000)
  successReturnToOrRedirect: '/',
  // If unsuccessfull, user is redirected back to login
  failureRedirect: '/login',
  //failureMessage: true
}));

// When a user signs out, the sesseion is deleted. User is directed back to the front-page. Now as a guest
router.post('/logout', function(req, res, next)
{
  req.logout(function(err)
  {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// Renders loclahost:3000/signup-page. CRUD-READ
router.get('/signup', function(req, res, next)
{
  res.render('signup');
});


// CRUD-CREATE function. This is when a guest wants to make a user
router.post('/signup', async function(req, res, next)
{
    // Try-function that attempts to run the signup-logic
    try
    {
        // Making a fullName by combining two columns in the users-table
        const fullName = req.body.firstname + " " + req.body.lastname;

        // Calling the service from UserService.js
        await userService.create
        (
            // These fields are created when a new user is signing up
            fullName,
            req.body.username,
            req.body.password,
            'member'
        );
        // When the user has signed up successfully, the user is redirected to localhost:3000/login
        res.redirect('/login');
    }
    // If there's an error, next(err) will run the error-handler found in app.js
    catch(err)
    {
        next(err);
    }
});

module.exports = router;