
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


function minify_chats (chats, uid, user_name) {
	var chats_users = [];
	var chat_obj = {};
	//remove all unnecessary attributes
	var return_chats = chats.map(function(chat) {
		var users = chat.users.map(user => {

			var sub_name = user.name;

			// if name == user's name, change to "me"
			if (user.id == uid) {
				sub_name = "me";
			}
			return({
				id: user.id,
				name: sub_name,
			});
		});

		chat_obj = {
			conv_id: chat.id,
			updatedAt: chat.updatedAt,
			users: users,
			messages: chat.messages,
		};

		return chat_obj;
	});

	return return_chats;
}


module.exports = {restrict_access, minify_chats};
