var fetch = require("node-fetch");
var db = require("./pg_database.js").db;
var VERBOSE = require("./pg_database.js").VERBOSE;
/* required table definition imports */
var db_tables = require ("./tables.js").db_tables;

/* if this flag is set true, overwrite existing tables */
var SHOULD_DROP_TABLES = true;


/* this function creates all tables defined in tables.js 
* if the overwrite flag is not passed as an argument, 
* the existing tables will be dropped and recreated 
* according to the SHOULD_DROP_TABLES flag */
function create_tables() {
		return db.sync({force: SHOULD_DROP_TABLES})
		.then(() => {
			if(VERBOSE) 
				console.log("Successfully created tables! ");
		})
		.catch((error) => {
			if(VERBOSE) 
				console.log("Error creating tables: ", error);
			throw error;
		})
		.then(() => {db.close()});
}


function get_active_chats_by_uid(uid){
	return db_tables.Users.findById(uid)
	    .then(user => { 
	    	if (! user)
	    		throw new Error ("The user does not exist.");
			
			if (VERBOSE) 
				console.log ("User found: ", JSON.stringify(user));

    		return user.getChats({
    			include: [
    				{ 
    					model: db_tables.Users,
    					through: { 
    						where: {active: true},
							attributes: ["id", "name"],
						}, 	
					},
					{ 
    					model: db_tables.Messages
					},
				]
    		})
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


module.exports = { create_tables, get_active_chats_by_uid };