
var fetch = require("node-fetch");
var create_user = require("../models/db_utils.js").create_user;
var	db = require("../models/pg_database.js").db;

function handleCreateUser () {
	console.log("(CREATEUSERTEST) beginning test.");
	const name ="tester";
	const email = "test@bepurposeful.co";
	const pwd = "test123";

	return create_user(name, email, pwd)
		.then ( user_data => console.log("(CREATEUSERTEST) new user entry:", user_data.data))
		.catch ( err => {
			console.log("(CREATEUSERTEST) error:", err);
			err => console.log("(CREATEUSERTEST) failed with errors.");
		})
		.then (() => db.close());
   }

  handleCreateUser();