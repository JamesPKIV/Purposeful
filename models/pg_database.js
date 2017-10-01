/* this file contains the database connection credentials. 
* you must modify the arguments according to your local database setup.
* This file has been gitignored. DO NOT push your modified 
* credentials to github/ source control. 
*/
const VERBOSE = true;

const Sequelize = require("sequelize");

/* the first argument is the database name ("purposeful_test_db")
* the second arg is your postgres username
* the third arg is your postgres password
*/
const db = new Sequelize("purposeful_test_db", "test", "test123", {
  	host: "localhost",
  	port: "5432",
  	dialect: "postgres",
});


module.exports = {db, Sequelize, VERBOSE};