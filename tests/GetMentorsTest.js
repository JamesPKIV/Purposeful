var fetch = require("node-fetch");
var db = require("../models/pg_database.js").db;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var create_db = require ("../models/create_tables.js").create_tables;
var create_user = require ("../models/db_utils.js").create_user;
var create_mentorship = require ("../models/db_utils.js").create_mentorship;
var get_mentors = require ("../models/db_utils.js").get_mentors;

function handle_get_mentors () {
		
	const create_users =[
		{name: "tester1", email: "test1@bepurposeful.co", pwd: "test123"},
		{name: "tester2", email: "test2@bepurposeful.co", pwd: "test123"},
		{name: "tester3", email: "test3@bepurposeful.co", pwd: "test123"},
	];

	var create_promises = [];
	var user ={};

	console.log("GET MENTORS TEST STARTING");

	return create_db()
		.then( () => {
			if (VERBOSE) console.log("creating user creation promises. ");
			for (var idx = 0; idx < create_users.length; idx++) {
				user = create_users[idx];
				create_promises.push(create_user(user.name, user.email, user.pwd));
			}

			return Promise.all(create_promises)
				.then(create_responses => {
					var users = [create_responses[0].data, create_responses[1].data, create_responses[2].data];
					if (VERBOSE) console.log("user creation responses: ", users);

					var ment_relations = [
						create_mentorship(users[0].id, users[1].id),
						create_mentorship(users[0].id, users[2].id),
						create_mentorship(users[1].id, users[2].id),
					];

					return Promise.all(ment_relations)
						.then(result => {
							if (VERBOSE) console.log("Mentorship relations created:", result);

							return get_mentors(users[0].id);
						})
						.catch(err => { throw err });

				})	
				.catch(err => { throw err });	
		})
		.then(result => {
			if (VERBOSE) console.log("Get Mentors Test completed without errors.");
		})
		.catch(error => {
			console.log("Error creating mentorship relation: ", error);
			console.log ("Create Mentor Test complete - failed with errors.");
		})
		.then(() => db.close());

}


/*
function get_mentors(mentee_uid) {
	const TEST_UID = mentee_uid;

	console.log("STARTING GET MENTORS TEST-----");

	return fetch("http://localhost:3001/api/mentorship/mentors", {
		headers: {accept: "application/json"},
		body: JSON.stringify({
			mentee_uid: TEST_UID,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("Recieved mentors data obj: ", user_data);
		console.log("(GETMENTORSTEST.JS) Get Mentors success!");
	} )
	.catch(error => {  
		console.log("Error in Get Mentors test: ", error);
		console.log('(GETMENTORSTEST.JS) Get Mentors Request failed with errors. ');  
	});

}
*/

/** this middleware function is a adapted from: 
https://github.com/fullstackreact/food-lookup-demo/blob/master/server.js
*/ 
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(`HTTP Error ${response.statusText}`);
	error.status = response.statusText;
	error.response = response;
	console.log(error); // eslint-disable-line no-console
	throw error;
}

function parseJSON(response) {
	return response.json();
}



handle_get_mentors();