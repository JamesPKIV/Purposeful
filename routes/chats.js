var db_tables =require("../models/tables.js").db_tables;
var db =require("../models/pg_database.js").db;
var VERBOSE = require("../models/pg_database.js").VERBOSE;
var Sequelize = require("../models/pg_database.js").Sequelize;
var express = require('express');
var router = express.Router();
var restrict_access = require("./route_utils.js").restrict_access;
var get_active_chats_by_uid = 
		require("../models/db_utils.js").get_active_chats_by_uid;
var minify_chats = require("./route_utils.js").minify_chats;

/**	
*	This HTTP GET function retrieves a list of all active chats for the
*   logged in user.
*
* Precondition: user must be logged in (session must exist for the user)
* Returns: if successful, a response is sent with status code 200 containing the 
*	JSON encoded object with the chat id's and participants for each of the 
*	user's active chats
**/
router.get("/get_active_chats", restrict_access, function(req, res, next) {

	console.log("serving /api/chats/get_active_chats request. ");
	const uid =req.session.user_id;
	const user_name = req.session.user_name;

	console.log("request session params:  id# "+ uid+": "+user_name);
	return get_active_chats_by_uid(uid)
	    .then(result => {
	    	if (VERBOSE) 
	    		console.log("retrieved chats: ", JSON.stringify(result));
    		
			var return_chats = minify_chats(result, uid, user_name);

    		res.json({msg: "ok", data: return_chats});
    	})
	    .catch(error => { 
	    	console.error("Error retrieving user's chats: " + error);
	    	handleError(error, res); 
	    	next(error); 
	    });
});



function handleError (err, response) {


	console.log("(CHATS.JS->HANDLEERROR): Error:", err.message );

	/* custom error messages for sequelize constrain validation rules */
	if (err instanceof Sequelize.ValidationError) {
		var err_msgs = [];
		var msg = "";
		var each_err = "";
		for (var err_idx = 0; err_idx < err.errors.length; err_idx++) {
			each_err = err.errors[err_idx];
			if (VERBOSE) console.log ("error: ", each_err);
    		msg = "";
    		/* custom message for unique column violations */
			if (each_err.type === "unique violation") {
				msg = "unique violation: An entry already exists with the "
					+ each_err.path + " provided: " + each_err.value;
			}
			/* default message for other error types */
			else {
				msg = each_err.message;
			}

			err_msgs.push(msg);
		}
		if (VERBOSE) console.log ("err_msgs: ", err_msgs);

		response.status(400).json({msg: "nok", "error": err_msgs});
		
	}
	else {
		response.status(500).json({msg: err.status, "error": err.message});
	}
}


module.exports = router;
