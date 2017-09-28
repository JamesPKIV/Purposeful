var fetch = require("node-fetch");
var db = require("./pg_database.js").db;
var VERBOSE = require("./pg_database.js").VERBOSE;
/* required table definition imports */
var tables = require ("./tables.js").db_tables;

/* if this flag is set true, overwrite existing tables */
var SHOULD_DROP_TABLES = true;



/* this function creates all tables defined in tables.js 
* if the overwrite flag is not passed as an argument, 
* the existing tables will be dropped and recreated 
* according to the SHOULD_DROP_TABLES flag */
function create_tables(overwrite_flag = SHOULD_DROP_TABLES) {
	return db.sync({force: overwrite_flag})
		.then(() => {
			if(VERBOSE) 
				console.log("Successfully created tables! ");
		})
		.catch((error) => {
			if(VERBOSE) 
				console.log("Error creating tables: ", error);
			throw error;
		});
}


/* this function creates an entry in the users table */
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
		console.log("(DB_UTILS->CREATE_USER) create_user success!");
		return user_data;
	} )
	.catch(function(error) {  
		console.log("DB_UTILS->CREATEUSER) create_user failed. "); 
		throw error; 
	});
}


/* this function gets a user's information by uid */
function get_user_by_uid (uid) {

	return fetch("http://localhost:3001/api/users/user/" + uid, {
			headers: {accept: "application/json"}
		})
		.then(checkStatus)
		.then(parseJSON)
		.then(user_data => {
			console.log("Get User by UID responded with user data obj: ", user_data);
			return user_data;
		} )
		.catch(error => {  
			console.log('Get User by Uid failed: ', error);  
			throw error;
		});
}


/* this function creates a mentorship relation between two users */
function create_mentorship(mentee_uid, mentor_uid) {
	console.log("(DB_UTILS->CREATE_MENTORSHIP) called!");
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
		console.log("Created new mentorship data obj: ", user_data.data);
		console.log("(DB_UTILS->CREATE_MENTORSHIP) create_mentorship success!");
		return user_data;
	} )
	.catch(function(error) {  
		console.log("Error in Create Mentorship: ", error); 
		console.log("DB_UTILS->CREATE_MENTORSHIP) create_mentorship failed with errors. "); 
		throw error; 
	});
}


/* this function returns user information for all of the given user's mentors */
function get_mentors(mentee_uid) {

	console.log("(DB_UTILS->GET_MENTORS) called with mentee_uid: ", mentee_uid);

	return fetch("http://localhost:3001/api/mentorship/mentors/" + mentee_uid, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(DB_UTILS->GET_MENTORS) Recieved mentors data obj: ", user_data.data);
		console.log("(DB_UTILS->GET_MENTORS) Get Mentors success!");
		return user_data;
	} )
	.catch(error => {  
		console.log("(DB_UTILS->GET_MENTORS) Error in Get Mentors test: ", error);
		console.log('(DB_UTILS->GET_MENTORS) Get Mentors Request failed with errors. ');
		throw error;  
	});
}


/** this middleware function is a adapted from: 
https://github.com/fullstackreact/food-lookup-demo/blob/master/server.js
*/
function checkStatus(response)  {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		return parseJSON(response)
			.then((res) => {
				error.body = res;
				console.log("CheckStatus Error Code ", response.status,": ", error.status); //
				console.log(error.body); //
				throw error;
			})
			.catch(function(error) {
				console.log(error); // eslint-disable-line no-consoleconsole.log(e); // calling it as a method, btw
				throw error;
			});
	}
	
}


function parseJSON(response) {
	return response.json();
}


module.exports = { create_tables, create_user, create_mentorship, 
	get_user_by_uid, get_mentors};