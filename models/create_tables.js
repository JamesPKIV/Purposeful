/*This file defines the postgres purposeful test database table structure */
var db = require("./pg_database.js").db;
var pgp = require("./pg_database.js").pgp;


db.task (t => {

		/*users table definitions*/
		const users_table_name = "users";
		const USER_TBL_COLUMNS = [
			"id SERIAL PRIMARY KEY", 
			"name VARCHAR(40) NOT NULL", 
			"email VARCHAR(40) NOT NULL",
		];

		/*interests table definitions*/
		const intr_table_name = "interests";
		const INTEREST_TBL_COLUMNS = [
			"id SERIAL PRIMARY KEY",
			"uid INTEGER REFERENCES users(id)", 
			"interest VARCHAR(100) NOT NULL", 
			"category VARCHAR(100)"
		];

		return drop_table(intr_table_name, t) /* drop interests table */
			.then(() => { return drop_table(users_table_name, t) /*  drop users table */
				.then(() => { return create_table(users_table_name, USER_TBL_COLUMNS, t) /* create users table */
					.then(() => { return create_table(intr_table_name, INTEREST_TBL_COLUMNS, t) /* create interests table */
						.then(() => {pgp.end()});
					})
				})
			});		
});

function drop_table(table_name, t) {
	return t.none("DROP TABLE IF EXISTS ${table~}", {table:table_name})
		.catch((error) => {console.log("Error dropping ", table_name, " table: ", error)});
}

function create_table(table_name, column_def_array, t) {
	return t.none(
		"CREATE TABLE IF NOT EXISTS ${table~}(${columns^}) ", {
			table: table_name,
			columns: column_def_array.join(","),
		})
		.then(() => {console.log(table_name, "table created!"); })
		.catch((error) => {console.log("Error creating ", table_name, " table: ", error)});
}

