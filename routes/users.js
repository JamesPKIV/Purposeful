var db =require("../models/pg_database.js").db;

var express = require('express');
var router = express.Router();



/**	
	This HTTP POST function creates a new user entry in the users table with the 
* name and email arguments provided in the request.
*
* Arguments: new user's name and email must be sent in the body of the request as JSON:
*		{name: "new user's name", email: "new user's email"}

* Returns: if successful, a response is sent with status code 200 containing the 
	JSON encoded object with the created user's name and assigned unique id,
	 accessible as the "data" member of the response body:
*		{data: {name: "NEW USERS NAME", id: 123}, ...}	
**/
router.post('/new', function(req, res, next) {

	const new_entry = req.body;
	console.log("serving /api/users/new request: ", new_entry);
	/* insert new entry into users table */
	const query = db.one(
	  	"INSERT INTO users(name, email) VALUES (${name}, ${email}) RETURNING (name, id)",
	  	new_entry
  	)
  	.then(query_data => { 
		console.log("USERS.JS: New User inserted:", query_data);
		return query_data;
	})
	.then( query_data => {
		/* format query data as an object with keys "name" and "id" */
		var row = query_data.row.slice(1, -1).split(",");
		var user_obj = {name: row[0], id:row[1]};
	  	res.json({msg: 'ok', data:user_obj});
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
