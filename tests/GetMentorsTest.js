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

handle_get_mentors();