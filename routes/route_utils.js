
function restrict_access(req, res, next) {
  if (req.session.user_id) {
  	console.log("Access granted- user is logged in with ID: " + req.session.user_id);
    return next();
  } else {
  	var err = new Error("access is restricted to logged in users.");

  	console.log(err);
  	console.log("session: " + JSON.stringify(req.session));
    throw err;
  }
}


module.exports = {restrict_access};
