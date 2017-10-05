var fetch = require("node-fetch");
var db = require("../../models/pg_database.js").db;
var VERBOSE = require("../../models/pg_database.js").VERBOSE;
var create_db = require ("../../models/db_utils.js").create_tables;
var add_new_user = require ("../src/Client.js").add_new_user;
var add_user_skill = require ("../src/Client.js").add_user_skill;
var get_users_with_skill = require ("../src/Client.js").get_users_with_skill;



function handle_get_users_with_skill () {

		const test_skill = "sassafras";
		const test_users =[
			{name: "tester1", email: "test1@bepurposeful.co", pwd: "test123", skill:"juggling"},
			{name: "tester2", email: "test2@bepurposeful.co", pwd: "test123", skill:"sassafras"},
			{name: "tester3", email: "test3@bepurposeful.co", pwd: "test123", skill:"sassafras"},
			{name: "tester4", email: "test4@bepurposeful.co", pwd: "test123", skill:"mischief and mayhem"},
		];

		var create_promises = [];
		var user ={};

		console.log("GET USERS WITH SKILL TEST STARTING");

		return create_db()
			.then( () => {
				if (VERBOSE) console.log("GET USERS WITH SKILL TEST creating promises. ");
				for (var idx = 0; idx < test_users.length; idx++) {
					user = test_users[idx];
					create_promises.push(add_new_user(user.name, user.email, user.pwd));
				}

				return Promise.all(create_promises)
					.then(users => {

						console.log("GET USERS WITH SKILL TEST add_new_user responses: ", users);
						var skill_promises = [];
						for (var idx = 0; idx < test_users.length; idx++) {
							user = test_users[idx];
							skill_promises.push(add_user_skill(users[idx].id, user.skill));
						}

						
						return Promise.all(skill_promises)
							.then(user_skills => {
								console.log("GET USERS WITH SKILL TEST add_user_skill responses: ", user_skills);

								return get_users_with_skill(test_skill);
							})
							.catch(error => {
								throw error;
							})
					})
					.catch(error => {
						throw error;
					})
					
   			})
   			.then(result => {
				if (VERBOSE) console.log("(GET USERS WITH SKILL TEST) Users with matching skill retrieved:", result);
				if (VERBOSE) console.log("(GET USERS WITH SKILL TEST) completed without errors.");
			})
			.catch(error => {
				console.log("(GET USERS WITH SKILL TEST) Error retrieving skilled users: ", error);
				console.log ("(GET USERS WITH SKILL TEST) Test complete - failed with errors.");
			})
			.then( () => db.close());		
}


  handle_get_users_with_skill();