/* React Client module for communicating with express server. 
*/

/** This function ...
*/
function fetch_user_profile(user_id, callback_fn) {
	return fetch("api/users/" + user_id, {
		accept: "application/json"
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(response => {callback_fn(response)} );
}

/** This function creates a new user account with the name, email, and password
* arguments provided and returns the created user's information if successful.
*
* Arguments:
* name: new user's name
* email: new user's email
* pwd: new user's password
* callback_fn: a callback function which recieves from the response the created user's 
* 	name and unique user ID. The callback function is passed an object with two members,
*	name and id, like this:
		{name: "NAME", id: 123}	
*/
function create_user(name, email, pwd, callback_fn) {
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
	.then(response => {
		console.log("(CLIENT.JS) create_user success! new user data obj: ", response.data);
		callback_fn(response.data);
	} )
	.catch(function(error) {  
		console.log('(CLIENT.JS) Create User Request failed', error);  
	});
}




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

module.exports = { create_user };