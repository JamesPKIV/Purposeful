/* React Client module for communicating with express server. 
*/

/** This function ...
*/
function get_user_profile(user_id, callback_fn) {
	return fetch("api/users/${user_id}", {
		accept: "application/json"
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(response => {callback_fn(response)} );
}

/** This function creates a user account with the name, email, and password
* arguments provided, then calls the callback function if the account
* creation succeeds.
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
		console.log("create_user success! new user data obj: ", response.data);
		callback_fn(response.data);
	} )
	.catch(function(error) {  
		console.log('Create User Request failed', error);  
	});
}


/** this function adapted from: 
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