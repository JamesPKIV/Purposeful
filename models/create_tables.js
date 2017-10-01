#!/usr/bin/env node

/** this file creates the database tables as defined in ./tables.js.
* It also drops any existing tables with the same names. To disable this
* behavior, change the variable flag SHOULD_DROP_TABLES. */


var db = require("./pg_database.js").db;
var VERBOSE = require("./pg_database.js").VERBOSE;

/* required table definition imports */
var tables = require ("./tables.js").db_tables;

/* if this flag is set true, overwrite existing tables */
var SHOULD_DROP_TABLES = true;



/* this function creates all tables defined in tables.js */
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
		});
}


 create_tables();

