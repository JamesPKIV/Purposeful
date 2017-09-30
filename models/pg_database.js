
/*postgres test connection*/
const pgp = require('pg-promise')(/*options*/);
const connectionString = process.env.DATABASE_URL || 
	"postgres://test:test@localhost:5432/purposeful_test_db";
const db = pgp(connectionString);

module.exports = {db, pgp};