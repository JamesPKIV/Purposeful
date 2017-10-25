var db_tables =require("../models/tables.js").db_tables;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var Sequelize = require("../models/pg_database.js").Sequelize;
var express = require('express');
var restrict_access = require("./route_utils.js").restrict_access;
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
	const entry_pwd = req.body.password;

	/* insert new entry into users table */
	const query = db_tables.Users.create({
			name: entry_name, 
			email: entry_email, 
			password:entry_pwd
		})
	  	.then( new_entry => { 
			console.log("USERS.JS: New User inserted:", new_entry);

				req.session.user_id = new_entry.id;
				req.session.user_name = new_entry.name;
			return new_entry;
		})
		.then( query_data => {
		  	res.json({message: 'ok', data:query_data});
	  	})
		.catch( err => {
	    	console.log("USERS.JS->/new): Error creating new user:", err.message );

	    	if (err instanceof Sequelize.ValidationError && err.errors) {
	    		var err_msgs = [];
	    		var message = "";
	    		var each_err = "";
	    		for (var err_idx = 0; err_idx < err.errors.length; err_idx++) {
	    			each_err = err.errors[err_idx];
	    			if (VERBOSE) console.log ("error: ", each_err);
		    		message = "";
	    			if (each_err.type === "unique violation") {
	    				message = "A user account already exists for the provided "	+ each_err.path
	    					 + ": " + each_err.value;
	    			}
	    			else {
	    				message = each_err.message;
	    			}

	    			err_msgs.push(message);
	    		}
	    		if (VERBOSE) console.log ("err_msgs: ", err_msgs);

				return res.status(400).json({message: err_msgs.join(", ")});
	    	}
	    	return res.status(500).json({message: err.message});
	    });
});



router.post("/login", (req, res, next) => {
	const new_entry = req.body;
	console.log("serving /api/users/login request: ", new_entry);
	const entry_email = req.body.email;
	const entry_pwd = req.body.password;
	/* insert new entry into users table */
	return db_tables.Users.findOne({
			where: {
				email: entry_email, 
				password:entry_pwd,
			}
		})
		.then(user => {

			if (user === null) {
				return res.status(401).json({
					message: "Log in failed: Email or password was not correct."
				});
			}
			else {
				console.log("User logged in:", user );
				//set session to store userID
				req.session.user_id = user.id;
				req.session.user_name = user.name;
				console.log("session saved: " + JSON.stringify(req.session));
				return res.json({message: "login successful", data: user});
			}
		})
		.catch(err => {
			console.log("Error logging user in: ", err);
			res.status(500).json({message: "Log in failed", error: err.message });
		});
})



router.post("/logout", (req, res, next) => {
	console.log("serving /api/users/logout request: ");
	/* Destroy the current session */
	req.session.destroy();
	return res.json({loggedout: true});
})

/* GET user listing by user id.  
* If successful, sends a response with a JSON body containing profile
* properties for the given id.
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
		return db_tables.Users.findById(uid)
			.then(user => {
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



router.post("/profile", restrict_access, function(req, res, next ) {
	var update_attrs = {};
	var user_id = req.session.user_id;

	if (req.body.present) {
		update_attrs["present"] = req.body.present;
	}
	if (req.body.past) {
		update_attrs["past"] = req.body.past;
	}
	if (req.body.future) {
		update_attrs["future"] = req.body.future;
	}

	db_tables.Users.findById(user_id)
		.then( user => {
			return user.update(update_attrs, {
					fields: Object.keys(update_attrs),
				})
				.then(user => {
					res.status(201).json({message:"ok", data:user})
				})
		})
		.catch((err) => {
				console.err("USERS.JS->/profile POST): Error updating user profile:", err.message );
				res.status(400).send({message: err.message});
				next(err);
			});




})



router.get('/profile/:uid', function(req, res, next) {

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
		return db_tables.Users.findById(uid)
			.then(user => {
				console.log("USERS.JS->/user/:uid) query data:", query_data);
				return query_data;
			})
			.then((query_data) => {
			  	return res.json({msg: 'ok', data:query_data});
			})
			.catch((err) => {
				console.err("USERS.JS->/user/:uid): Error retrieving user by id:", err.message );
				res.status(400).send({message: "Unable to retrieve user", "error": err.message});
				next(err);
			});
	}
})





module.exports = router;
