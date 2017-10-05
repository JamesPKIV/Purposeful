var db_tables =require("../models/tables.js").db_tables;
var db =require("../models/pg_database.js").db;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var Sequelize = require("../models/pg_database.js").Sequelize;
var express = require('express');
var router = express.Router();



/**	
	This HTTP POST function creates a new skill entry for the user with the 
* user id and skill name provided in the request.
*
* Arguments: new user's skill name and user id must be sent in the body of the request as JSON:
*		{ uid: "user's email", skill_name: "new skill name"}

* Returns: if successful, a response is sent with status code 200 containing the 
	JSON encoded object with the created user-skill relation.
**/
router.post('/new', function(req, res, next) {
	const new_entry = req.body;
	console.log("serving /api/skills/new request with body: ", new_entry);
	const entry_uid = new_entry.uid;
	const entry_skill_name = new_entry.skill_name;

	
	return db.transaction(function(tr) { 

		console.log ("transaction started.");
		
		var finds = [
			db_tables.Users.findById(entry_uid, {transaction: tr}),
			db_tables.Skills.findOrCreate(
				{where:{name: entry_skill_name}},
				 {transaction: tr}
			),
		];


		return Promise.all(finds)
		    .then(entries => { 
		    	console.log ("User, skill objects: ", entries);

		    	var user = entries[0];
		    	var skill = entries[1];

		    	if (! user)
		    		throw new Error ("The user does not exist.")

		    	if (! skill)
		    		throw new Error ("The skill name is not valid.")


	    		return user.addSkill(skill, {transaction: tr})
		    		.then((result) => {
				    	if (VERBOSE) console.log("Added new user-skill relation: ", JSON.stringify(result));
			    		return result;
					})
			})
		    .then(result => {
		    	if (VERBOSE) console.log("Successfully added new skill relation: ", result);
	    		res.json({msg: "ok", data: result[0][0]});
	    		return result;
	    	})
		    .catch(error => { 
		    	handleError(error, res); 
		    	next(error); 
		    });	
	})


});


/* GET user's skills by user id.  
* If successful, sends a response with a JSON body containing name and 
* email properties for the given id.
*/
router.get('/get_skills/:uid', function(req, res, next) {

	if (VERBOSE) {
		console.log("SKILLS.JS->/get_skills/:uid) reached. req.params:", req.params);
	}
	var uid = req.params.user_id;

	/* check to ensure user id was provided */
	if ( !uid) {
		var err_msg = '(USERS.JS->/get_skills/:uid): No user ID provided in request params: '+ req.params;
		console.log("ERROR ", err_msg );
		return res.status(400).send({message: err_msg});
	}
	else {
		/* query users table */
		return db.Users.findById(uid)
			.then(user => {
				if ( !user) {
					var err_msg = "(USERS.JS->/get_skills/:uid): No user matches the id provided.";
					console.log("ERROR ", err_msg );
					return res.status(400).send({message: err_msg});
				}
				if (VERBOSE) 
					console.log("SKILLS.JS->/get_skills/:uid) user data:", user);

				return user.getSkills()
					.then (skills => {
						console.log("SKILLS.JS->/get_skills/:uid) user skills data:", skills);
					  	return res.json({msg: 'ok', data:skills});
					})
					.catch(err => {
						console.err("SKILLS.JS->/get_skills/:uid): Error retrieving user skills:", err.message );
						res.status(400).send({msg: "nok", "error": err.message});
						next(err);
					});
			});
	}
})


module.exports = router;
