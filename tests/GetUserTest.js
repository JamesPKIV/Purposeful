var fetch = require("node-fetch");


function fetch_user_profile_test() {
	const TEST_UID = 1;

	console.log("STARTING GET USER TEST-----");

	fetch("http://localhost:3001/api/users/user/" + TEST_UID, {
		headers: {accept: "application/json"}
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("get user success! new user data obj: ", user_data);
	} )
	.catch(function(error) {  
		console.log('Get User Request failed: ', error);  
	})
	.then(() => { 
		console.log("GETUSER TEST FINISHED*****");
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



fetch_user_profile_test();