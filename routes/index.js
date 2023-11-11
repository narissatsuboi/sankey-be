var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Auth */
router.get('/auth', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/auth.html'));
});

/* Sankey Diagram */
router.get('/sankey', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/sankey.html'));
});

module.exports = router;