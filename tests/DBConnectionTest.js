var db = require ("../models/pg_database.js").db;

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  })
  .done(() => { db.close() });