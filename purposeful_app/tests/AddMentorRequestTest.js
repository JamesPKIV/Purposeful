var add_new_user = require("../src/Client.js").add_new_user;
var add_mentor_request = require("../src/Client.js").add_mentor_request;
var login = require("../src/Client.js").login;
var	db = require("../../models/pg_database.js").db;


function handleAddMentorRequest () {
	console.log("(ADDMENTORREQUESTTEST)  beginning test.");

	const name_1 ="Alice";
	const email_1 = "Alice@bepurposeful.co";
	const pwd_1 = "alice";
	const name_2 ="Bob";
	const email_2 = "Bob@bepurposeful.co";
	const pwd_2 = "bob";

	const bobs_msg = "Hi Alice, mentor me please! Sincerely, Bob";


	return Promise.all([
		add_new_user(name_1, email_1, pwd_1),
		add_new_user(name_2, email_2, pwd_2),
	])	
	.catch ( err => {
		console.log("(ADDMENTORREQUESTTEST)  create account error:", err);
		console.log("(ADDMENTORREQUESTTEST)  retrying test using login instead.");

		return Promise.all([
		login(email_1, pwd_1),
		login(email_2, pwd_2),
		]);
	})
	.then(Alice_Bob => {
		var Alice = Alice_Bob[0];
		var Bob = Alice_Bob[1];
		return add_mentor_request(Bob.id, Alice.id, bobs_msg)
		.then(mentor_req => {
			console.log("(ADDMENTORREQUESTTEST) responded with mentor request: " 
				+ JSON.stringify(mentor_req));
		})
		.catch (err => {
			console.log("(ADDMENTORREQUESTTEST)  add mentor request returned error:", err);
			console.log("(ADDMENTORREQUESTTEST)  test failed with errors.");
		});
	})
	.catch ( err => {
		console.log("(ADDMENTORREQUESTTEST)  account login error:", err);
		console.log("(ADDMENTORREQUESTTEST)  test failed before attempting mentor request: "
			+ "both login and create account failed for the test users.");
	})
	.then (() => db.close());
}

handleAddMentorRequest();