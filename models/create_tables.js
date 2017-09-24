


var db = require("./pg_database.js").db;
var pgp = require("./pg_database.js").pgp;
var dbconsts = require("./table_defs.js");

/* if this flag is set true, overwrite existing tables */
const SHOULD_DROP_TABLES = true;


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
		.then(() => { if(dbconsts.VERBOSE) console.log("Success dropping table ", table_name)})
		.catch((error, table_name) => {if(dbconsts.VERBOSE) console.log("Error dropping table ", table_name, ": ", error)});
}


/* creates a table with the given name and columns if the table doesnt exist */
function create_table(table_name, column_def_array, t) {
	return t.any(
		"CREATE TABLE IF NOT EXISTS ${table~}(${columns^}) ", {
			table: table_name,
			columns: column_def_array.join(","),
		})
		.then(() => {
			if(dbconsts.VERBOSE) {
				console.log("Success creating table ", table_name, " with columns: ");
				console.log(column_def_array);
			}
		})
		.catch((error) => {if(dbconsts.VERBOSE) console.log("Error creating ", table_name, " table: ", error)});
}



/* this task creates the tables listed in the TBL_NAME_COL_MAP. 
* It also drops the tables if the drop flag is set.
*/
db.task (t => {
	if (SHOULD_DROP_TABLES) {
		return drop_tables(dbconsts.ALL_TBL_NAME_COL_MAP, t)
			.then(() => { return create_tables(dbconsts.INDEP_TBL_NAME_COL_MAP, t)/* create users table */
				.then(() => { return create_tables(dbconsts.DEP_TBL_NAME_COL_MAP, t)/* create users table */
					.then(() => { pgp.end()});
				})
			});
	} else {
		return create_tables(dbconsts.INDEP_TBL_NAME_COL_MAP, t)/* create users table */
			.then(() => { return create_tables(dbconsts.DEP_TBL_NAME_COL_MAP, t)/* create users table */
				.then(() => { pgp.end()});
			})
	}
});	
