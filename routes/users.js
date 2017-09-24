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
	  	"INSERT INTO users(name, email) VALUES (${name}, ${email}) RETURNING (name, id) AS name, id",
	  	new_entry
  	)
  	.then(query_data => { 
		console.log("USERS.JS: New User inserted:", query_data);
		return query_data;
	})
	.then( query_data => {
	  	res.json({msg: 'ok', data:query_data});
	})
	.catch(error => {
        console.log('CLIENT ERROR: creating new user:', error);
    });
});


/* GET user listing by user id.  
* If successful, sends a response with a JSON body containing name and 
* email properties for the given id.
*/
router.get('/user/:uid', function(req, res, next) {

console.log("USERS.JS->/user/:uid) reached. req.params:", req.params);
	/* query users table */
	const query = db.one(
	  "SELECT name, email FROM users WHERE id = $1", [req.params.uid]
	)
	.then((query_data) => {
		console.log("USERS.JS->/user/:uid) query data:", query_data);
		return query_data;
	})
	.then((query_data) => {
	  res.json({msg: 'ok', data:query_data});
	});
})


module.exports = router;
