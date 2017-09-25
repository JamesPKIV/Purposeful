
var fetch = require("node-fetch");

function handleCreateUser () {
		const name ="tester";
		const email = "test@bepurposeful.co";
		const pwd = "test123";

		console.log("starting Create User test! ");
		create_user(name, email, pwd, (data) => {
			console.log("(LandingPage) user account created! new user data: ", data);
			alert("user account created! new user id: "+ data.id);
			this.setState({
				uid: data.id
			});
		});


		
   }


function create_user() {
	const name = "tester";
	const email = "test@bepurposeful.co";
	const pwd = "test123";

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
		console.log("create_user success! new user data obj: ", user_data);
	} )
	.catch(function(error) {  
		console.log('Create User Request failed', error);  
	})
	.then(() => { 
		console.log("CREATEUSER TEST FINISHED*****");
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



  handleCreateUser();