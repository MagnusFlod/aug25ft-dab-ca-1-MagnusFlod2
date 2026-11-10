// Neseccary imports
var express = require('express');
var router = express.Router();

/* GET home page. http://localhost:3000*/
router.get('/', function (req, res, next)
{
  // If a user is logged in, req.user exists. If not, req.user is undefined
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;
