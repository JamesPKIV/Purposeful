var db =require("../models/tables.js").db_tables;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var Sequelize = require("../models/pg_database.js").Sequelize;
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
	const entry_name = req.body.name;
	const entry_email = req.body.email;

	/* insert new entry into users table */
	const query = db.Users.create({name: entry_name, email: entry_email})
	  	.then( query_data => { 
			console.log("USERS.JS: New User inserted:", new_entry);
			return query_data;
		})
		.then( query_data => {
		  	res.json({msg: 'ok', data:query_data});
		})
		.catch( err => {
	    	console.log("USERS.JS->/new): Error creating new user:", err.message );

	    	if (err instanceof Sequelize.ValidationError) {
	    		var err_msgs = [];
	    		var msg = "";
	    		var each_err = "";
	    		for (var err_idx = 0; err_idx < err.errors.length; err_idx++) {
	    			each_err = err.errors[err_idx];
	    			if (VERBOSE) console.log ("error: ", each_err);
		    		msg = "";
	    			if (each_err.type === "unique violation") {
	    				msg = "A user account already exists for the provided "	+ each_err.path
	    					 + ": " + each_err.value;
	    			}
	    			else {
	    				msg = each_err.message;
	    			}

	    			err_msgs.push(msg);
	    		}
	    		if (VERBOSE) console.log ("err_msgs: ", err_msgs);

				return res.status(400).json({msg: "nok", "errors": err_msgs});
	    	}
	    });
});


/* GET user listing by user id.  
* If successful, sends a response with a JSON body containing name and 
* email properties for the given id.
*/
router.get('/user/:uid', function(req, res, next) {

	if (VERBOSE) {
		console.log("USERS.JS->/user/:uid) reached. req.params:", req.params);
	}
	var uid = req.params.uid;

	/* check to ensure user id was provided */
	if ( !uid) {
		var err_msg = 'No user ID provided in request params: '+ req.params;
		console.err("USERS.JS->/user/:uid): ", err_msg );
		return res.status(400).send({message: err_msg});
	}
	else {
		/* query users table */
		return db.Users.findById(uid)
			.then((query_data) => {
				console.log("USERS.JS->/user/:uid) query data:", query_data);
				return query_data;
			})
			.then((query_data) => {
			  	return res.json({msg: 'ok', data:query_data});
			})
			.catch((err) => {
				console.err("USERS.JS->/user/:uid): Error retrieving user by id:", err.message );
				res.status(400).send({msg: "nok", "error": err.message});
				next(err);
			});
	}
})


module.exports = router;
