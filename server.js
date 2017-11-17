var express = require("express");
var http = require("http"); 
var socketIO = require("socket.io");
var expr_session = require("express-session");
var sharedsession = require("express-socket.io-session");
var SequelizeStore = require('connect-session-sequelize')(expr_session.Store);
var db = require('./models/pg_database.js').db;
var path = require("path");
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var users = require('./routes/users.js');
var skills = require('./routes/skills.js');
var mentorship = require('./routes/mentorship.js');
var chats = require('./routes/chats.js');
var on_connect_socket = require('./socketIO/on_connect_socket.js');

var app = express();
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
* Create socket.io connection.
*/
var sio = socketIO(server);


//set up session store in our DB through sequelize
var sess_store = new SequelizeStore({db: db});

//set up sessions
var sess = {
	secret: 'keyboard cat',
	resave: true, 
	saveUninitialized: false,
	cookie: {maxAge: 3600000, secure:false},//max age 1 hour
	store: sess_store,
};


// Use express-session middleware for express
if (app.get('env') === 'production') {
	app.set('trust proxy', 1); // trust first proxy
	sess.cookie.secure = true; // serve secure cookies
}
var session = expr_session(sess);
app.use(session);


// Use shared session middleware for socket.io
// setting autoSave:true
sio.use(sharedsession(session, {
    autoSave:true
})); 


sess_store.sync();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//include socketIO for use in chat
app.use(function(req, res, next){
  res.sio = sio;
  next();
});



sio.on('connection', on_connect_socket.bind(this, sio));
	


//app.use("/api/interests", interests);
app.use("/api/skills", skills);
app.use("/api/mentorship", mentorship);
app.use("/api/users", users);
app.use("/api/chats", chats);

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

module.exports = {app: app, server: server};
