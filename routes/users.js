var db =require("../models/pg_database.js").db;

var express = require('express');
var router = express.Router();


/* POST create new user listing. */
router.post('/new', function(req, res, next) {

	console.log("serving /api/users/new request: ", req.body);
	/* insert new entry into users table */
	const query = db.one(
	  	"INSERT INTO users(name, email) VALUES (${name}, ${email}) RETURNING id",
	  	req.body
  	)
	.then(query_data => { 
		console.log("New User inserted with id: ", query_data.id);
		return query_data;
	})
	.then( query_data => {
	  	res.json({msg: 'Getting goodies from the users route!', data:query_data});
	})
	.catch(error => {
        console.log('ERROR:', error);
    });
});


/* GET users listing. */
router.get('/:uid', function(req, res, next) {


	/* query users table */
	const query = db.query(
	  "SELECT name, email FROM users WHERE id = ${1}", [uid]
	)
	.then(() => { pgp.end()});
	  res.json({msg: 'Getting goodies from the users route!', data:query});
});


module.exports = router;
