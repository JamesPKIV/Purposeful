var express = require('express');
var router = express.Router();

var VERBOSE = require("../models/pg_database.js").VERBOSE;
var db_tables = require("../models/tables.js").db_tables;
var db = require("../models/pg_database.js").db;
var Sequelize = require("../models/pg_database.js").Sequelize;
var restrict_access = require("./route_utils.js").restrict_access;

/**	
	This HTTP POST function creates a new entry in the mentorship table with the 
* user id's to be added, passed as thementor_id and mentee_id arguments provided
* in the request.
*
* Arguments: mentor's user id and mentee's user id must be sent in the body of
*	 the request as JSON:
*		{"mentee_uid": "123", "mentor_uid": "456"}

* Returns: if successful, a response is sent with status code 200 containing the 
	JSON encoded object with the created mentorship relation's attributes,
	 accessible as the "data" property of the response body:
*		{data: {id: "123", name: "John Doe", email:"..."  ...}}	
**/
router.post('/new', restrict_access, function(req, res, next) {
	console.log("serving /api/mentorship/new request.");

	const new_entry = req.body;
	if (VERBOSE) console.log ("request body:", new_entry);

	const mentee_uid = req.session.userID;
	const mentor_uid = new_entry.mentor_uid;

	if ( (!mentor_uid) || (!mentee_uid) ) {
		console.log ("ERROR: Request body must contain mentor_uid and mentee_uid.");
		handleError(new Error("Request body must contain mentor_uid and mentee_uid"), res);
		return null;
	}
	if (VERBOSE) {
		console.log ("Uids check out.");
	}

	/* transaction to add mentor and mentee relations */
	return db.transaction(function(tr) { 

		console.log ("transaction started.");
		
		var creates = [
			db_tables.Users.findById(mentee_uid, {transaction: tr}),
			db_tables.Users.findById(mentor_uid, {transaction: tr}),
		];

		return Promise.all(creates)
		    .then(entries => { 
		    	console.log ("Users created: ", entries);

		    	var mentee = entries[0];
		    	var mentor = entries[1];
	    		return mentee.addMentor(mentor, {transaction: tr})
		    		.then((result) => {
				    	if (VERBOSE) console.log("Added new mentorship relation: ", JSON.stringify(result));
			    		return result;
					})
			})
		    .then(result => {
		    	if (VERBOSE) console.log("Successfully added new mentorship relation: ", result);
	    		res.json({msg: "ok", data: result[0][0]});
	    		return result;
	    	})
		    .catch(error => { 
		    	handleError(error, res); 
		    	next(error); 
		    });	
	})
	
});



router.get("/dash", restrict_access, (req, res, next) => {

	if (VERBOSE) console.log("MENTORSHIP.JS->/dash reached. ");
	if (VERBOSE) console.log ("request params:", req.params);

	const user_id = req.session.userID;

	if (!user_id) {
		var msg = "No user_uid provided in session."
		return handleError( new Error(msg), res );
	}

	/* lookup mentee in users table, then get mentors */
	return db_tables.Users.findById(user_id)
		.then(user => {
			if (VERBOSE) console.log("MENTORSHIP.JS->/dash) user retrieved: ", user);
			
			var user_queries = [
				user.getMentees(),
				user.getMentors(),
				user.getSkills(),
			]

			return Promise.all(user_queries)	
		    	.then(results => {

		    		console.log()
		    		var mentee_list = results[0];
		    		var mentor_list = results[1];
		    		var skill_list = results[2];

		    		
		    		var rand_idx = Math.floor(skill_list.length * Math.random());
		    		var rand_skill = skill_list[rand_idx];
		    		//get a random skill to return recommended mentors for 
		    		return rand_skill.getUsers()
		    			.then ( recomm_mentors => {
		    				if (VERBOSE) 
		    					console.log("Successfully fetched mentees: ", mentee_list);
		    				
		    				var data = {
		    					mentees:mentee_list, 
		    					mentors:mentor_list, 
		    					recommended:recomm_mentors
		    				};

		    				res.json({msg: "ok", data: data})
		    			});

			    	
		    	})
		})
		.catch(error => {  handleError(error, res) });	
})



/* GET user's mentors listings by user id.  
* If successful, sends a response with a JSON body containing user
* properties for all mentors for the given mentee_uid.
*/
router.get('/mentors/:mentee_uid', function(req, res, next) {

	if (VERBOSE) console.log("MENTORSHIP.JS->/mentors reached. ");

	if (VERBOSE) console.log ("request params:", req.params);

	const mentee_uid = req.params.mentee_uid;

	/* TODO: validate that user is who they claim to be with sessions */



	if (!mentee_uid) {
		var msg = "No mentee_uid provided in request json body."
		return handleError( new Error(msg), res );
	}
	if (VERBOSE) console.log("mentee_uid provided:", mentee_uid);
	/* lookup mentee in users table, then get mentors */
	return db_tables.Users.findById(mentee_uid)
		.then(mentee => {
			if (VERBOSE) console.log("MENTORSHIP.JS->/mentors) mentee retrieved: ", mentee);
			return mentee.getMentors()	
		    	.then(mentor_list => {
			    	if (VERBOSE) console.log("Successfully fetched mentors: ", mentor_list);
		    		res.json({msg: "ok", data: mentor_list})
		    	})
		})
		.catch(error => {  handleError(error, res) });	
})



/* GET user's mentees listings by mentor's user id.  
* If successful, sends a response with a JSON body containing user
* properties for all mentees for the given mentor_uid.
*/
router.get('/mentees/:mentor_uid', function(req, res, next) {

	if (VERBOSE) console.log("MENTORSHIP.JS->/mentees reached. ");

	if (VERBOSE) console.log ("request params:", req.params);

	const mentor_uid = req.params.mentor_uid;

	/* TODO: validate that user is who they claim to be with sessions */

	if (!mentor_uid) {
		var msg = "No mentor_uid provided in request json body."
		return handleError( new Error(msg), res );
	}
	if (VERBOSE) console.log("mentor_uid provided:", mentor_uid);
	/* lookup mentee in users table, then get mentors */
	return db_tables.Users.findById(mentor_uid)
		.then(mentor => {
			if (VERBOSE) console.log("MENTORSHIP.JS->/mentors) mentor retrieved: ", mentor);
			return mentor.getMentees()	
		    	.then(mentee_list => {
			    	if (VERBOSE) console.log("Successfully fetched mentees: ", mentee_list);
		    		res.json({msg: "ok", data: mentee_list})
		    	})
		})
		.catch(error => {  handleError(error, res) });	
})






function handleError (err, response) {

	console.log("(MENTORSHIP.JS->HANDLEERROR): Error:", err.message );

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
				msg = "unique violation: An account already exists for the provided "
					+ each_err.path + ": " + each_err.value;
			}
			/* default message for other error types */
			else {
				msg = each_err.message;
			}

			err_msgs.push(msg);
		}
		if (VERBOSE) console.log ("err_msgs: ", err_msgs);

		response.status(400).json({msg: "nok", "errors": err_msgs});
		
	}
	else {
		response.status(400).json({msg: "nok", "error": err});
	}

}

module.exports = router;
