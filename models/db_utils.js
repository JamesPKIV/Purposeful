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
	get_user_by_uid, get_mentors, add_user_skill, get_user_skills};