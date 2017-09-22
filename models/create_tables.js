/*postgres test connection*/
var db = require("./pg_database.js").db;
var pgp = require("./pg_database.js").pgp;

/* create users table */
db.task (t => {
	return t.none("DROP TABLE IF EXISTS users")
	.then( () => {
		return t.any(
  			"CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL, email VARCHAR(40) NOT NULL) "
  		)
	})
	.then(() => { pgp.end()});
});