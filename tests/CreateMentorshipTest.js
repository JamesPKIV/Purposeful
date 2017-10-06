
var fetch = require("node-fetch");
var db = require("../models/pg_database.js").db;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var create_db = require ("../models/create_tables.js").create_tables;
var create_user = require ("../models/db_utils.js").create_user;
var create_mentorship = require ("../models/db_utils.js").create_mentorship;

function handle_create_mentor () {
		
		const create_users =[
			{name: "tester1", email: "test1@bepurposeful.co", pwd: "test123"},
			{name: "tester2", email: "test2@bepurposeful.co", pwd: "test123"},
		];

		var create_promises = [];
		var user ={};

		console.log("CREATE MENTOR TEST STARTING");

		return create_db()
			.then( () => {
				if (VERBOSE) console.log("CREATE MENTOR TEST creating promises. ");
				for (var idx = 0; idx < create_users.length; idx++) {
					user = create_users[idx];
					create_promises.push(create_user(user.name, user.email, user.pwd));
				}

				return Promise.all(create_promises)
					.then(create_responses => {


						console.log("CREATE MENTOR TEST create responses: ", create_responses);


						var user_ids = [create_responses[0].data.id, create_responses[1].data.id] ;
						if (VERBOSE) console.log("user creation response uids: ", user_ids);
						return create_mentorship(user_ids[0], user_ids[1]);
					})
					.catch(error => {
						console.log("Error creating mentorship accounts. ");
						throw error;
					})
					
   			})
   			.then(result => {
				if (VERBOSE) console.log("Mentorship relation created:", result);
				if (VERBOSE) console.log("Create Mentor Test completed without errors.");
			})
			.catch(error => {
				console.log("Error creating mentorship relation: ", error);
				console.log ("Create Mentor Test complete - failed with errors.");
			})
			.then( () => db.close());		
}


/*

function create_mentorship(mentor_uid, mentee_uid) {

	return fetch("http://localhost:3001/api/mentorship/new", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			mentor_uid: mentor_uid,
			mentee_uid: mentee_uid,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("Created new mentorship data obj: ", user_data);
		console.log("(CREATEMENTORTEST.JS) create_mentorship success!");
		return user_data;
	} )
	.catch(function(error) {  
		console.log("Error in Create Mentors test: ", error); 
		console.log("CREATEMENTORTEST.JS) create_mentorship failed with errors. "); 
		throw error; 
	});
}



function create_user(name, email, pwd) {

	return fetch("http://localhost:3001/api/users/new", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			email: email,
			pwd: pwd,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("Created new user data obj: ", user_data);
		console.log("(CREATEUSERTEST.JS) create_user success!");
		return user_data;
	} )
	.catch(function(error) {  
		console.log("CREATEUSERTEST.JS) Create User failed. "); 
		return error; 
	});
}

*/




  handle_create_mentor();