//this file sets up socket.io event listeners for a socket upon connection 


var get_active_chats_by_uid = 
	require("../models/db_utils.js").get_active_chats_by_uid;
var db_tables = require("../models/tables.js").db_tables;

function on_connect_socket (sio, socket) {

	console.log("serving /on_connect_socket connection.");
	const uid = socket.handshake.session.user_id;
	console.log("socket session user id: "+ uid);
	// destroy socket if not logged in
	if (!uid) {
		socket.disconnect(true);
		console.error("Socket disconnected - user not logged in.");
	}

	//connect to rooms for each socket chat
	get_active_chats_by_uid(uid)
	    .then(result => {
	    	console.log("retrieved chats: ", JSON.stringify(result));
    		return result;
    	})
    	.then(result => {
    		//get chat ID's
    		var user_name = socket.handshake.session.user_name;
    		var room_name = "";
    		var chat_id;
    		var tstamp;
    		//attach socket to each chat room according to chat ID
    		for (var i = 0; i < result.length; i++) {
    			chat_id = result[i].id;
    			room_name = chat_id;
    			//join room
    			socket.join(room_name, function() {
    				tstamp = new Date().toLocaleString();
    				//send message to members already in rooms
    				socket.to(room_name).emit( "user joined", {
    					user_name: user_name,
    					user_id: uid,
    					time: tstamp,
    				});
    				console.log("User " + uid + " joined chat room " + room_name);
    			});

    		}
    	})
	    .catch(error => { 
	    	console.error("Error retrieving user's chats: " + error);
	    });

	socket.on('new_message', function (msg_obj) {
		console.log("(new_message) socket event recieved.")
		var user_id = socket.handshake.session.user_id;
		var user_name =socket.handshake.session.user_name;
		var msg = msg_obj.message;
		var chat_id = msg_obj.chat_id;

		return get_active_chats_by_uid(user_id)
			.then(chats => {
				var current_chat = chats.find(chat => {
					return chat.id == chat_id;
				});

				if (!current_chat) {
					throw new Error (
						"Cannot find a record of the requested chat for this user."
						);
				}

				return db_tables.Messages.create({
		    			userId: user_id,
		    			body: msg,
	    			})
					.then(message =>{

						return current_chat.addMessage(message)
							.then (chat => {
								console.log("New Message added to chat:" + JSON.stringify(chat));
								sio.to(chat.id).emit( "new_message", {
			    					message: message,
			    					chat_id: chat.id,
			    				});
			    				console.log("new_message emitted to chat "+ chat.id +":" + JSON.stringify(message));
							})
					})


					



			})

		


		console.log(data);
	});
}

module.exports = on_connect_socket;