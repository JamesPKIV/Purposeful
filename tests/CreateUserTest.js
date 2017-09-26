
var fetch = require("node-fetch");

function handleCreateUser () {
		const name ="tester";
		const email = "test@bepurposeful.co";
		const pwd = "test123";

		create_user(name, email, pwd);
   }


function create_user(name, email, pwd) {

	console.log("STARTING CREATEUSER TEST-----");

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
		console.log("Created new user data obj: ", user_data);
		console.log("(CREATEUSERTEST.JS) create_user test success!");
	} )
	.catch(function(error) {  
		console.log("CREATEUSERTEST.JS) Create User test failed. ");  
	});
}


/** this middleware function is a adapted from: 
https://github.com/fullstackreact/food-lookup-demo/blob/master/server.js
*/ 
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`(CREATEUSERTEST.JS)HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		return parseJSON(response)
			.then((res) => {
				error.body = res;
				
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



  handleCreateUser();