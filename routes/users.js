var express = require('express');
var router = express.Router();


/*postgres test connection*/
var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://test:test@localhost:5432/purposeful_test_db');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Getting goodies from the users route!');
});

module.exports = router;
