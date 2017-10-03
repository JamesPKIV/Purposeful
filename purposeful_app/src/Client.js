/* React Client module for communicating with express server. 
*/

/** This function creates a new user account with the name, email, and password
* arguments provided and returns the created user's information if successful.
*
* Arguments:
* name: new user's name
* email: new user's email
* pwd: new user's password
*
* Returns:  an object with the entry that was created in the database, like this:
*		{name: "NAME", id: 123, ...}	
*/
function add_new_user(name, email, pwd) {

	return fetch("api/users/new", {
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
	.then(result => {
		console.log("(CLIENT.JS->ADD_NEW_USER) Response OK with new user data obj: ", result.data);
		console.log("(CLIENT.JS->ADD_NEW_USER) responded with status OK"); 
		return result.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->ADD_NEW_USER) Request Error:", error);
		console.log("(CLIENT.JS->ADD_NEW_USER) Request Failed with Errors.");
		throw error.body;

	});
}



/* this function gets a user's information by uid */
function get_user_by_uid (uid) {

	return fetch("api/users/user/" + uid, {
			headers: {accept: "application/json"}
		})
		.then(checkStatus)
		.then(parseJSON)
		.then(result => {
			console.log("(CLIENT.JS->GET_USER_BY_UID) Response OK with new user data obj: ", result.data);
			console.log("(CLIENT.JS->GET_USER_BY_UID) responded with status OK"); 
			return result.data;
		} )
		.catch(function(error) {  
			console.log("(CLIENT.JS->GET_USER_BY_UID) Request Error:", error);
			console.log("(CLIENT.JS->GET_USER_BY_UID) Request Failed with Errors.");
			throw error.body;  
		});
}


/* this function creates a mentorship relation between two users */
function add_mentorship(mentee_uid, mentor_uid) {
	console.log("(DB_UTILS->ADD_NEW_MENTORSHIP) called!");
	return fetch("api/mentorship/new", {
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
	.then(result => {
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) Response OK with new user data obj: ", result.data);
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) responded with status OK"); 
			return result.data;
		})
		.catch(function(error) {  
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) Request Error:", error);
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) Request Failed with Errors.");
			throw error.body;  
		});
	
}


/* this function returns user information for all of the given user's mentors */
function get_mentors(mentee_uid) {

	console.log("(DB_UTILS->GET_MENTORS) called with mentee_uid: ", mentee_uid);

	return fetch("api/mentorship/mentors/" + mentee_uid, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
			console.log("(CLIENT.JS->GET_MENTORS) Response OK with new user data obj: ", result.data);
			console.log("(CLIENT.JS->GET_USER_BY_UID) responded with status OK"); 
			return result.data;
		} )
		.catch(function(error) {  
			console.log("(CLIENT.JS->GET_USER_BY_UID) Request Error:", error);
			console.log("(CLIENT.JS->GET_USER_BY_UID) Request Failed with Errors.");
			throw error.body;  
		});
}


/* this function creates a user skill relation */
function add_user_skill(user_id, skill_name) {
	console.log("(DB_UTILS->ADD_USER_SKILL) called!");
	return fetch("api/skills/new", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user_id: user_id,
			skill_name: skill_name,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(DB_UTILS->ADD_USER_SKILL) Created new user skill data obj: ", user_data.data);
		console.log("(DB_UTILS->ADD_USER_SKILL) response recieved without error.");
		return user_data.data;
	} )
	.catch(error => {  
		console.log("(DB_UTILS->ADD_USER_SKILL)Error: ", error); 
		console.log("DB_UTILS->ADD_USER_SKILL) failed with errors. "); 
		throw error.body; 
	});
}



/* this function returns user information for all of the given user's mentors */
function get_user_skills(user_id) {

	console.log("(DB_UTILS->GET_USER_SKILLS) called with user_id: ", user_id);

	return fetch("api/skills/get_skills/" + user_id, {
		headers: {
			"Accept": "application/json",
		},
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(DB_UTILS->GET_USER_SKILLS) Recieved mentors data obj: ", user_data.data);
		console.log("(DB_UTILS->GET_USER_SKILLS) Get User Skills Response recieved without error");
		return user_data.data;
	} )
	.catch(error => {  
		console.log("(DB_UTILS->GET_USER_SKILLS) Error in Get Mentors test: ", error);
		console.log('(DB_UTILS->GET_USER_SKILLS) Get User Skills Request failed with errors. ');
		throw error.body;  
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


module.exports = {  add_new_user, add_mentorship, 
	get_user_by_uid, get_mentors, add_user_skill, get_user_skills};

