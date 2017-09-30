var db_tables =require("../models/tables.js").db_tables;
var db =require("../models/pg_database.js").db;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var Sequelize = require("../models/pg_database.js").Sequelize;
var express = require('express');
var router = express.Router();



/**	
	This HTTP POST function creates a new interest entry for the user with the 
* user id and interest name provided in the request.
*
* Arguments: new user's interest name and user id must be sent in the body of the request as JSON:
*		{ user_id: "user's email", interest_name: "new interest name"}

* Returns: if successful, a response is sent with status code 200 containing the 
	JSON encoded object with the created user-interest relation.
**/
router.post('/new', function(req, res, next) {
	const new_entry = req.body;
	console.log("serving /api/interests/new request with body: ", new_entry);
	const entry_uid = new_entry.user_id;
	const entry_interest_name = new_entry.interest_name;

	
	return db.transaction(function(tr) { 

		if (VERBOSE) 
			console.log ("transaction started.");
		
		var finds = [
			db_tables.Users.findById(entry_uid, {transaction: tr}),
			db_tables.Interests.findOrCreate({where:{name: entry_interest_name}, {transaction: tr}),
		];


		return Promise.all(finds)
		    .then(entries => { 
		    	console.log ("User, interest objects: ", entries);

		    	var user = entries[0];
		    	var interest = entries[1];

		    	if (! user)
		    		throw new Error ("The user does not exist.")

		    	if (! interest)
		    		throw new Error ("The interest name is not valid.")


	    		return user.addInterest(interest, {transaction: tr})
		    		.then((result) => {
			    		return result;
					})
			})
		    .then(result => {
		    	if (VERBOSE) console.log("Successfully added new interest relation: ", JSON.stringify(result));
	    		res.json({msg: "ok", data: result[0][0]});
	    		return result;
	    	})
		    .catch(error => { 
		    	handleError(error, res); 
		    	next(error); 
		    });	
	})


});


/* GET user's interest listings by user id
*
* Arguments: new user's interest name and user id must be sent in the body of the request as JSON:
*		{ user_id: "user's id"}
*
* Returns: if successful, a response is sent with status code 200 containing the 
*	JSON encoded object with the users interest relations.
*/
router.get('/get_interests/:uid', function(req, res, next) {

	if (VERBOSE) {
		console.log("interestS.JS->/get_interests/:uid) reached. req.params:", req.params);
	}
	var uid = req.params.user_id;

	/* check to ensure user id was provided */
	if ( !uid) {
		var err_msg = '(USERS.JS->/get_interests/:uid): No user ID provided in request params: '+ req.params;
		console.log("ERROR ", err_msg );
		return res.status(400).send({message: err_msg});
	}
	else {
		/* query users table */
		return db.Users.findById(uid)
			.then(user => {
				if ( !user) {
					var err_msg = "(USERS.JS->/get_interests/:uid): No user matches the id provided.";
					console.log("ERROR ", err_msg );
					return res.status(400).send({message: err_msg});
				}
				if (VERBOSE) 
					console.log("interestS.JS->/get_interests/:uid) user data:", user);

				return user.getInterests()
					.then (interests => {
						console.log("interestS.JS->/get_interests/:uid) user interests data:", interests);
					  	return res.json({msg: 'ok', data:interests});
					})
					.catch(err => {
						console.err("interestS.JS->/get_interests/:uid): Error retrieving user interests:", err.message );
						res.status(400).send({msg: "nok", "error": err.message});
						next(err);
					});
	}
})


module.exports = router;
