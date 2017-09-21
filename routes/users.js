var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Getting goodies from the users route!');
});

module.exports = router;
