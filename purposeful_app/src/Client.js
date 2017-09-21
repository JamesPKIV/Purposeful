function get_user_profile(user_id, callback_fn) {
	return fetch("api/users?q=${user_id}", {
		accept: "application/json"
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(callback_fn);
}


/** this function adapted from: 
https://github.com/fullstackreact/food-lookup-demo/blob/master/server.js
*/ 
function checkStatus(res) {
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