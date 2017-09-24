/*This file defines the postgres purposeful test database table structure */
var db = require("./pg_database.js").db;
var pgp = require("./pg_database.js").pgp;


/* if this flag is set true, report status of all queries */
const VERBOSE = true;

/* if this flag is set true, overwrite existing tables */
const SHOULD_DROP_TABLES = true;

		
/* table names */
const USER_TBL = "users";
const MENTR_TBL = "mentorship";
const INTR_TBL = "interests";
const SKILL_TBL = "skills";
const USER_SKILL_MAP = "user_skill_map";
const USER_INTR_MAP = "user_interest_map";  


/* table column definitions */
/* users table */
const USER_TBL_COLS = [
	"id SERIAL PRIMARY KEY", 
	"name VARCHAR(40) NOT NULL", 
	"email VARCHAR(40) NOT NULL",
];

/* interests table definitions */
const INTR_TBL_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"interest VARCHAR(100) NOT NULL", 
	"category VARCHAR(100)"
];

/* skills table definitions */

const SKILLS_TBL_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"name VARCHAR(100) NOT NULL", 
	"level VARCHAR(100)",
	"category VARCHAR(100)",
];



/* The tables defined below map the user data tables above to one another. */
/* Mentorship user map table definitions*/
const MENTR_TBL_COLS = [
	"id SERIAL PRIMARY KEY",
	"mentor_uid INTEGER NOT NULL REFERENCES users(id)", 
	"mentee_uid INTEGER NOT NULL REFERENCES users(id)", 
];


/*user-skill map table definitions*/
const USER_SKILL_MAP_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"skill_id INTEGER  NOT NULL REFERENCES skills(id)"
];


/*user-interest map table definitions*/
const USER_INTR_MAP_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"interest_id INTEGER NOT NULL REFERENCES interests(id)"
];


/* map of table names to their respective column definitions. */

/* this map contains the independent tables, which contain no references to 
* other tables. 
*/
const INDEP_TBL_NAME_COL_MAP = {
	[USER_TBL]: USER_TBL_COLS,
	[INTR_TBL]: INTR_TBL_COLS,
	[SKILL_TBL]: SKILLS_TBL_COLS,
} 

/* this map contains the dependent tables, which DO contain references to 
* other tables. 
*/
const DEP_TBL_NAME_COL_MAP = {
	[MENTR_TBL]: MENTR_TBL_COLS,
	[USER_SKILL_MAP]: USER_SKILL_MAP_COLS, 
	[USER_INTR_MAP]: USER_INTR_MAP_COLS,
} 

/* this map contains the join of all tables listed in the 
* DEP_/INDEP_TBL_NAME_COL_MAP onjects above.
*/
const ALL_TBL_NAME_COL_MAP = Object.assign(
	DEP_TBL_NAME_COL_MAP, INDEP_TBL_NAME_COL_MAP);



/* this function drops all tables passed as keys in the name_col_map */
function drop_tables(name_col_map, t) {
	var drops =[];

	for (tbl_name in name_col_map) {
		drops.push(drop_table(tbl_name, t));
	}
	return Promise.all(drops);
}


/* this function creates all tables in the name_col_map */
function create_tables(name_col_map, t) {
	var creates =[];

	for (tbl_name in name_col_map) {
		var tbl_col_list = name_col_map[tbl_name];
		creates.push(create_table(tbl_name, tbl_col_list, t));
	}
	return Promise.all(creates);
}


/* drops a table with the given name if the table exists */
function drop_table(table_name, t) {
	return t.any("DROP TABLE IF EXISTS ${table~} CASCADE", {table:table_name})
		.then(() => { if(VERBOSE) console.log("Success dropping table ", table_name)})
		.catch((error, table_name) => {if(VERBOSE) console.log("Error dropping table ", table_name, ": ", error)});
}


/* creates a table with the given name and columns if the table doesnt exist */
function create_table(table_name, column_def_array, t) {
	return t.any(
		"CREATE TABLE IF NOT EXISTS ${table~}(${columns^}) ", {
			table: table_name,
			columns: column_def_array.join(","),
		})
		.then(() => {
			if(VERBOSE) {
				console.log("Success creating table ", table_name, " with columns: ");
				console.log(column_def_array);
			}
		})
		.catch((error) => {if(VERBOSE) console.log("Error creating ", table_name, " table: ", error)});
}



/* this task creates the tables listed in the TBL_NAME_COL_MAP. 
* It also drops the tables if the drop flag is set.
*/
db.task (t => {
	if (SHOULD_DROP_TABLES) {
		return drop_tables(ALL_TBL_NAME_COL_MAP, t)
			.then(() => { return create_tables(INDEP_TBL_NAME_COL_MAP, t)/* create users table */
				.then(() => { return create_tables(DEP_TBL_NAME_COL_MAP, t)/* create users table */
					.then(() => { pgp.end()});
				})
			});
	} else {
		return create_table(users_table_name, USER_TBL_COLS, t)/* create users table */
			/*.then(() => { return create_table(intr_table_name, INTEREST_TBL_COLS, t) /* create interests table */
			.then(() => { pgp.end()});
	}
});	
