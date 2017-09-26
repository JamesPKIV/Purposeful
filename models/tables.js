/*This file defines the postgres purposeful test database table structure */

var Sequelize = require("./pg_database.js").Sequelize;
var db = require("./pg_database.js").db;
var VERBOSE = require("./pg_database.js").VERBOSE;


const Users = db.define('users', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING, allowNull: false}, 
	email: {type: Sequelize.STRING, allowNull: false, unique: true},
});


const Interests = db.define('interests', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	interest: {type: Sequelize.STRING, allowNull: false}, 
});


const Skills = db.define('skills', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING, allowNull: false}, 
	level: {type: Sequelize.STRING},
});


const Mentorships = db.define('mentorships', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
});
Users.belongsToMany(Users, { through: Mentorships, as:"mentor_uid"});
Users.belongsToMany(Users, { through: Mentorships, as:"mentee_uid"});


const User_Skill_Map = db.define('user_skill_map', {
	level: {type: Sequelize.STRING}
});
Users.belongsToMany(Skills, { through: User_Skill_Map });
Skills.belongsToMany(Users, { through: User_Skill_Map });


const User_Inter_Map = db.define('user_inter_map', {
});
Users.belongsToMany(Interests, { through: User_Inter_Map });
Interests.belongsToMany(Users, { through: User_Inter_Map });


const db_tables = {
	Users: Users,
	Skills: Skills,
	Interests: Interests, 
	Mentorships: Mentorships,
	User_Skill_Map: User_Skill_Map,
	User_Inter_Map: User_Inter_Map,
};


module.exports = {db_tables, VERBOSE};

