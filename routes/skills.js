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
router.post("/new", function(req, res, next) {
	const new_entry = req.body;
	console.log("serving /api/skills/new request with body: ", new_entry);
	const entry_uid = new_entry.user_id;
	const entry_skill_name = new_entry.skill_name;


	var finds = [
		db_tables.Users.findById(entry_uid),
		db_tables.Skills.findCreateFind({ 
			where: {
				name: entry_skill_name
			},
		}),
	];


	return Promise.all(finds)
	    .then(entries => { 
	    	console.log ("User, skill objects: ", JSON.stringify(entries));

	    	var user = entries[0];
	    	var skill = entries[1][0];

	    	if (! user)
	    		throw new Error ("The user does not exist.")

	    	if (! skill)
	    		throw new Error ("The skill name is not valid.")


    		return user.addSkill(skill)
	    		.then((result) => {
			    	if (VERBOSE) console.log("Added new user-skill relation: ", JSON.stringify(result));
		    		return result;
				})
				.catch(error => { 
			    	handleError(error, res); 
			    	next(error); 
			    });	
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
});




/**	
	This HTTP POST function creates a set of new skill entries for the user with the 
* user id and skill names provided in the request.
*
* Arguments: new user's skill names array and user id must be sent in the body of the request as JSON:
*		{ uid: "user's email", skill_names: ["new skill 1", "new skill 2",...] }

* Returns: if successful, a response is sent with status code 200 containing the 
	JSON encoded object with the created user-skill relations.
**/
router.post("/add_skills", function(req, res, next) {
	const new_entry = req.body;
	console.log("serving /api/skills/add_skills request with body: ", new_entry);
	const entry_uid = new_entry.user_id;
	const entry_skill_arr = new_entry.skill_names;


	var finds = [ db_tables.Users.findById(entry_uid) ];
	var entry_skill_name = "";

	for (var i = 0; i < entry_skill_arr.length; i++) {
		entry_skill_name = entry_skill_arr[i];
	 	finds.push( 
	 		db_tables.Skills.findCreateFind({ 
				where: {
					name: entry_skill_name
				},
			})
		); 
	}

	return Promise.all(finds)
	    .then(entries => { 
	    	console.log ("User, skill objects: ", JSON.stringify(entries));

	    	var user = entries[0];
	    	var skills = entries.slice(1).map(x => { return x[0] });


	    	if (! user)
	    		throw new Error ("The user does not exist.");

	    	if (! skills)
	    		throw new Error ("The skill name is not valid.");

			return user.addSkills(skills)
	    		.then((result) => {
			    	if (VERBOSE) console.log("(/api/skills/add_skills) Added new user-skill relations: ", JSON.stringify(result));
		    		return result;
				})
				.catch(error => { 
			    	throw error;
			    });	
		})
	    .then(result => {
	    	if (VERBOSE) console.log("(/api/skills/add_skills) Successfully added new skill relations: ", result);
			res.json({msg: "ok", data: result[0]});
			return result;
		})
		.catch(error => { 
			handleError(error, res); 
			next(error); 
		});
});



/* GET user's skills by user id.  user_id must be 
*
* If successful, sends a response with a JSON body containing name and 
* email properties for the given id.
*/
router.get("/get_skills/:uid", function(req, res, next) {

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



/* GET users who possess a given skill.
*  
* If successful, sends a response with a JSON body containing user 
* objects for each of the matching skill users.
*/
router.get("/get_users_with_skill/:skill_name", function(req, res, next) {

	console.log("serving /api/skills/get_users_with_skill request.");

	var skill_name = req.params && req.params.skill_name;
	if (! skill_name)
		throw new Error ("The skill name is not valid.")

	db_tables.Skills.findOne({
			where: {
				name: skill_name
			}
		})
		.then (skill => {
			if ( !skill) {
				var err_msg = "No users found with the skill provided.";
				console.log("(SKILLS.JS->/get_users_with_skills/:skill_name): ", err_msg );
				return res.send({msg:"ok", data: err_msg});
			}

			console.log("Skill found: ", skill);
			
			return skill.getUsers()
				.then((result) => {
			    	if (VERBOSE) console.log("Found users with the requested skill: ", JSON.stringify(result));
		    		res.json({msg: "ok", data: result});
		    		return result;
				})
				.catch(error => { 
			    	handleError(error, res); 
			    	next(error); 
			    });		
		})
	    .catch(err => {
			console.err("SKILLS.JS->/get_users_with_skills/:skill_name): Error retrieving users with the requested skill:", err.message );
			res.status(400).send({msg: "nok", "error": err.message});
			next(err);
		});
})



function handleError (err, response) {

	console.log("(SKILLS.JS->HANDLEERROR): Error:", err.message );

	/* custom error messages for sequelize constrain validation rules */
	if (err instanceof Sequelize.ValidationError) {
		var err_msgs = [];
		var msg = "";
		var each_err = "";
		for (var err_idx = 0; err_idx < err.errors.length; err_idx++) {
			each_err = err.errors[err_idx];
			if (VERBOSE) console.log ("error: ", each_err);
    		msg = "";
    		/* custom message for unique column violations */
			if (each_err.type === "unique violation") {
				msg = "unique violation: An entry already exists with the "
					+ each_err.path + " provided: " + each_err.value;
			}
			/* default message for other error types */
			else {
				msg = each_err.message;
			}

			err_msgs.push(msg);
		}
		if (VERBOSE) console.log ("err_msgs: ", err_msgs);

		response.status(400).json({msg: "nok", "error": err_msgs});
		
	}
	else {
		response.status(500).json({msg: err.status, "error": err.message});
	}
}


module.exports = router;
