var express = require("express");
var session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var db = require('./models/pg_database.js').db;
var path = require("path");
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var users = require('./routes/users.js');
var skills = require('./routes/skills.js');
var mentorship = require('./routes/mentorship.js');

//var interests = require('./routes/interests.js');

var app = express();

//set up session store in our DB through sequelize
var sess_store = new SequelizeStore({db: db});

//set up sessions
var sess = {
	secret: 'keyboard cat',
	resave: true, 
	saveUninitialized: true,
	cookie: {maxAge: 3600000, secure:false},//max age 1 hour
	store: sess_store,
};


if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	//TODO for production: sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
sess_store.sync();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




//app.use("/api/interests", interests);
app.use("/api/skills", skills);
app.use("/api/mentorship", mentorship);
app.use("/api/users", users);

app.get("/api/testing", (req, res)=> {
	console.log("Serving /api/testing...");
	res.json({
		message: "testing get express request!!!"
	});

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({error: res.locals.error, message: res.locals.message || "Error rendering error page"});

});

module.exports = app;
