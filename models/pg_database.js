const Sequelize = require("sequelize");


/* thhe first argument is the database name ("purposeful_test_db")
* the second arg is your postgres username
* the third arg is your postgres password
*/
const db = new Sequelize('database', 'username', 'password', {
  	host: "localhost",
  	port: "5432",
  	dialect: "postgres",
});


db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {db, Sequelize};