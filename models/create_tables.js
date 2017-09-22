/*postgres test connection*/
const pgp = require('pg-promise')(/*options*/);
const connectionString = process.env.DATABASE_URL || 
	"postgres://test:test@localhost:5432/purposeful_test_db";
const db = pgp(connectionString);

/* create users table */
const query = db.query(
  'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL)'
  )
.then(() => { pgp.end()});
