/*This file defines the postgres purposeful test database table structure */

var pgp = require("./pg_database.js").pgp;


var VERBOSE = true;

	/* table names */
var USER_TBL_NAME = "users";
var MENTR_TBL_NAME = "mentorship";
var INTR_TBL_NAME = "interests";
var SKILL_TBL_NAME = "skills";
var USER_SKILL_MAP_NAME = "user_skill_map";
var USER_INTR_MAP_NAME = "user_interest_map";  


/* table column definitions */
/* users table */
var USER_TBL_COLS = {
	id: "SERIAL PRIMARY KEY", 
	name: "VARCHAR(40) NOT NULL", 
	email: "VARCHAR(40) NOT NULL",
};



/* interests table definitions */
var INTR_TBL_COLS = {
	id: "SERIAL PRIMARY KEY",
	uid: "INTEGER NOT NULL REFERENCES users(id)", 
	interest: "VARCHAR(100) NOT NULL", 
	category: "VARCHAR(100)"
};

/* skills table definitions */
var SKILLS_TBL_COLS = {
	id: "SERIAL PRIMARY KEY",
	uid: "INTEGER NOT NULL REFERENCES users(id)", 
	name: "VARCHAR(100) NOT NULL", 
	level: "VARCHAR(100)",
	category: "VARCHAR(100)",
};



/* The tables defined below map the user data tables above to one another. */
/* Mentorship user map table definitions*/
var MENTR_TBL_COLS = {
	id: "SERIAL PRIMARY KEY",
	mentor_uid: "INTEGER NOT NULL REFERENCES users(id)", 
	mentee_uid: "INTEGER NOT NULL REFERENCES users(id)", 
	timestamp: "TIMESTAMP WITH TIME ZONE"
};


/*user-skill map table definitions*/
var USER_SKILL_MAP_COLS = {
	id: "SERIAL PRIMARY KEY",
	uid: "INTEGER NOT NULL REFERENCES users(id)", 
	skill_id: "INTEGER  NOT NULL REFERENCES skills(id)"
};


	/*user-interest map table definitions*/
var USER_INTR_MAP_COLS = {
	id: "SERIAL PRIMARY KEY",
	uid: "INTEGER NOT NULL REFERENCES users(id)", 
	interest_id:  "INTEGER NOT NULL REFERENCES interests(id)"
};

var INDEP_TBL_NAME_COL_MAP = {
	[USER_TBL_NAME]: USER_TBL_COLS, 
	[INTR_TBL_NAME]: INTR_TBL_COLS,
	[SKILL_TBL_NAME]: SKILLS_TBL_COLS,		
}; 

/* this map contains the dependent tables, which DO contain references to 
* other tables. 
*/
var DEP_TBL_NAME_COL_MAP = {
	[MENTR_TBL_NAME]: MENTR_TBL_COLS,
	[USER_SKILL_MAP_NAME]: USER_SKILL_MAP_COLS, 
	[USER_INTR_MAP_NAME]: USER_INTR_MAP_COLS,
};

/* this map contains the join of all tables listed in the 
* DEP_ and INDEP_TBL_NAME_COL_MAP objects above.
*/
var ALL_TBL_NAME_COL_MAP = Object.assign({}, 
	DEP_TBL_NAME_COL_MAP, INDEP_TBL_NAME_COL_MAP);


/* creates a pg-promise ColumnSet to be exported and used in all queries 
* 	throughout the backend app.
*/
function create_col_set(table_name, columns_obj) {

	/* Users table column names for use in queries */
	var col_names = [];
	Object.keys(columns_obj).forEach( (key) => {
		col_names.push( pgp.helpers.Column(key));
		/*USER_COL_NAMES[key] = pgp.helpers.Column(key);*/
	});
	
	var col_set = new pgp.helpers.ColumnSet(
		col_names, {table: table_name}
	);

	if (VERBOSE) {
		console.log( "ColumnSet created for table: ", table_name);
		console.log( "ColumnSet: ", col_set);
	};

	return col_set;
}

function create_all_col_sets (name_cols_map) {
	var table_col_sets = {};
	var tbl_col_obj;

	for (var tbl_name in name_cols_map) {
		tbl_col_obj = name_cols_map[tbl_name];
		table_col_sets[tbl_name] = create_col_set(tbl_name, tbl_col_obj);
	}

	if (VERBOSE) {
		console.log("(TABLE_DEFS.JS) Create all column sets completed. Sets:");
		console.log(table_col_sets);
	}

	return table_col_sets;
}

var ALL_COLUMN_SETS = create_all_col_sets(ALL_TBL_NAME_COL_MAP) ;



var DB_VARS = Object.freeze({
	/* if this flag is set true, report status of all queries */
	VERBOSE : VERBOSE,

	/* maps of table names to their respective column definitions. */

	/* this map contains the independent tables, which contain no references to 
	* other tables. 
	*/
	INDEP_TBL_NAME_COL_MAP : INDEP_TBL_NAME_COL_MAP,

	/* this map contains the dependent tables, which DO contain references to 
	* other tables and cannot be created until the independent tables are created. 
	*/
	DEP_TBL_NAME_COL_MAP : DEP_TBL_NAME_COL_MAP,

	/* this map contains the join of all tables listed in the 
	* DEP_/INDEP_TBL_NAME_COL_MAP onjects above.
	*/
	ALL_TBL_NAME_COL_MAP : ALL_TBL_NAME_COL_MAP,


	
	SQL_NAMES : ALL_COLUMN_SETS,

	/* table column definitions */
	/* users table */
	USER_TBL_COLS : USER_TBL_COLS,

	/* interests table definitions */
	INTR_TBL_COLS : INTR_TBL_COLS,

	/* skills table definitions */
	SKILLS_TBL_COLS : SKILLS_TBL_COLS,



	/* The tables defined below map the user data tables above to one another. */
	/* Mentorship user map table definitions*/
	MENTR_TBL_COLS : MENTR_TBL_COLS,

	/*user-skill map table definitions*/
	USER_SKILL_MAP_COLS : USER_SKILL_MAP_COLS,

	/*user-interest map table definitions*/
	USER_INTR_MAP_COLS: USER_INTR_MAP_COLS,
})



module.exports = DB_VARS;

