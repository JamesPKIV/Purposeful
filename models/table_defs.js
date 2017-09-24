/*This file defines the postgres purposeful test database table structure */



	/* table names */
var USER_TBL = "users";
var MENTR_TBL = "mentorship";
var INTR_TBL = "interests";
var SKILL_TBL = "skills";
var USER_SKILL_MAP = "user_skill_map";
var USER_INTR_MAP = "user_interest_map";  


	/* table column definitions */
	/* users table */
var USER_TBL_COLS = [
	"id SERIAL PRIMARY KEY", 
	"name VARCHAR(40) NOT NULL", 
	"email VARCHAR(40) NOT NULL",
];

/* interests table definitions */
var INTR_TBL_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"interest VARCHAR(100) NOT NULL", 
	"category VARCHAR(100)"
];

/* skills table definitions */

var SKILLS_TBL_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"name VARCHAR(100) NOT NULL", 
	"level VARCHAR(100)",
	"category VARCHAR(100)",
];



/* The tables defined below map the user data tables above to one another. */
/* Mentorship user map table definitions*/
var MENTR_TBL_COLS = [
	"id SERIAL PRIMARY KEY",
	"mentor_uid INTEGER NOT NULL REFERENCES users(id)", 
	"mentee_uid INTEGER NOT NULL REFERENCES users(id)", 
];


/*user-skill map table definitions*/
var USER_SKILL_MAP_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"skill_id INTEGER  NOT NULL REFERENCES skills(id)"
];


	/*user-interest map table definitions*/
var USER_INTR_MAP_COLS = [
	"id SERIAL PRIMARY KEY",
	"uid INTEGER NOT NULL REFERENCES users(id)", 
	"interest_id INTEGER NOT NULL REFERENCES interests(id)"
];

var INDEP_TBL_NAME_COL_MAP = {
		[USER_TBL]: USER_TBL_COLS,
		[INTR_TBL]: INTR_TBL_COLS,
		[SKILL_TBL]: SKILLS_TBL_COLS,
}; 

/* this map contains the dependent tables, which DO contain references to 
* other tables. 
*/
var DEP_TBL_NAME_COL_MAP = {
	[MENTR_TBL]: MENTR_TBL_COLS,
	[USER_SKILL_MAP]: USER_SKILL_MAP_COLS, 
	[USER_INTR_MAP]: USER_INTR_MAP_COLS,
};

/* this map contains the join of all tables listed in the 
* DEP_/INDEP_TBL_NAME_COL_MAP onjects above.
*/
var ALL_TBL_NAME_COL_MAP = Object.assign(
	DEP_TBL_NAME_COL_MAP, INDEP_TBL_NAME_COL_MAP);

var DB_VARS = Object.freeze({
	/* if this flag is set true, report status of all queries */
	VERBOSE : true,

	/* maps of table names to their respective column definitions. */

	/* this map contains the independent tables, which contain no references to 
	* other tables. 
	*/
	INDEP_TBL_NAME_COL_MAP : INDEP_TBL_NAME_COL_MAP,

	/* this map contains the dependent tables, which DO contain references to 
	* other tables. 
	*/
	DEP_TBL_NAME_COL_MAP : DEP_TBL_NAME_COL_MAP,

	/* this map contains the join of all tables listed in the 
	* DEP_/INDEP_TBL_NAME_COL_MAP onjects above.
	*/
	ALL_TBL_NAME_COL_MAP : ALL_TBL_NAME_COL_MAP,
})


module.exports = DB_VARS;

