import React, { Component } from 'react';
import './ChatPage.css';
import NavBar from '../NavBar/NavBar';
import FaClose from 'react-icons/lib/fa/close';

class ChatPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conv_array: [
				{"conv_id": "0","user1":"me", "user2":"Hermione",
				 "messages": [
					 {"body":"This is a message that you sent to Hermione", "author":"1", "time_stamp":"TIME STAMP"},
					 {"body":"This is a message that Hermione sent to you", "author":"0", "time_stamp":"TIME STAMP"},
					 {"body":"This is a very very long message that you sent to Hermione because you are very excited about everything and I am trying to make this super long to see how it would look like but it is not long enough so I am gonna keep typing",
						 "author":"1", "time_stamp":"TIME_STAMP"}
				 ]},
				 {"conv_id": "1","user1":"me", "user2":"Roald",
					"messages": [
						{"body":"This is a message that you sent to Roald", "author":"1", "time_stamp":"TIME STAMP"},
						{"body":"This is a message that Roald sent to you", "author":"0", "time_stamp":"TIME STAMP"},
						{"body":"This is a very very long message that you sent to Roald because you are very excited about everything and I am trying to make this super long to see how it would look like but it is not long enough so I am gonna keep typing",
							"author":"1", "time_stamp":"TIME_STAMP"}
					]},
					{"conv_id": "2","user1":"me", "user2":"Aretha",
					 "messages": [
						 {"body":"This is a message that you sent to Aretha", "author":"1", "time_stamp":"TIME STAMP"},
						 {"body":"This is a message that Aretha sent to you", "author":"0", "time_stamp":"TIME STAMP"},
						 {"body":"This is a very very long message that you sent to Aretha because you are very excited about everything and I am trying to make this super long to see how it would look like but it is not long enough so I am gonna keep typing",
							 "author":"1", "time_stamp":"TIME_STAMP"}
					 ]},
			],
			curr_conv: "0",
			message_out: "",
		};

		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleNewMessageChange = this.handleNewMessageChange.bind(this);

	}


componentDidMount() {
	this.props.fetchData();
}


	render () {
		var apos = "'"; /*to avoid editor complaining about non-closed apostrophe*/
		
		console.log("prop chatArray:");
		console.log(this.props.chatArray);

		return(
			<span>
				<span className="row">
					<NavBar/>
				</span>
				<span className="row">
					<div className="col s3 m3 l3">
						<div className="col s10 m10 l10 push-l1">
							<div className="row">
								<h5>Find someone to chat with:</h5>
								<div className="input-field inline">
									<input id="chat_search" type="text"></input>
									<label for="chat_search" className="active">Start typing someone{apos}s name:</label>
								</div>
							</div>
							<div className="row">
								<h5>Active conversations:</h5>
								<div>
									{this.conversation_list()}
								</div>
							</div>
						</div>
					</div>
					<div className="col s9 m9 l9">
						<div className="col s12 m12 l12 card-panel">
							{this.current_conversation(this.props.chatArray)}
						</div>
					</div>
				</span>
			</span>
		);
	}

	conversation_list(){
		var i;
		var array = this.props.chatArray;
		let return_code = null;
		for(i = 0; i < array.length; i++){
			var conv = array[i];
			var conv_id = conv["conv_id"];
			//blindly ovverriding this for now- returned chats should all 
			//be active
			//if(this.state.active_array.indexOf(conv_id) >= 0){
			if(conv) {
				var name = "";
				if (conv["users"][0]["name"]==="me" ) {
					name = conv["users"][1]["name"];
				} else {
					name = conv["users"][0]["name"];
				}
				let boundCardClick = this.change_conv.bind(this,conv_id, "change");
				let boundCloseClick = this.change_conv.bind(this,conv_id, "close");
				return_code =
					<span>{return_code}
						<div className="row">
							<div className="card-panel hoverable valign-wrapper name-panel">
								<div onClick={() => boundCardClick()} className="valign col s10 m10 l10 name light-green lighten-4">
									{name}
								</div>
								<div onClick={()=> boundCloseClick()} className="valign col s2 m2 l2 close">
									<FaClose/>
								</div>
							</div>
						</div>
					</span>
			}
		}
		return (return_code);
	}

	change_conv(id, action){
		if(action === "change"){
			this.setState({
				curr_conv: id
			});
		} else {
			var array = this.state.active_array;
			var index = array.indexOf(id);
			array.splice(index, 1);

			if(this.state.curr_conv === id){
				var new_curr;
				if(array.length === 0){
					new_curr = "-1";
				} else {
					new_curr = array[(index+1)%array.length];
				}
				this.setState({
					curr_conv: new_curr
				});
			}
			/*NOTICE THAT this function removes the conversation from the
				active_array but NOT from the conv_array! Therefore messages are
				not lost.*/
			this.setState({
				active_array: array
			});
		}
	}

	current_conversation(conversations){
		var conv_id = parseInt(this.state.curr_conv);
		var array = conversations;
		if((conv_id >= 0) && (typeof array === "object") 
			&& (array.length > 0)) {

			var conv = array[conv_id];
			var your_style="col s5 m5 l5 left-align message light-green lighten-3";
			var their_style="col s5 m5 l5 push-l6 left-align message blue-grey lighten-3";
			var name = "";

			if (conv["users"][0]["name"] === "me" ) {
				name = conv["users"][1]["name"];
			} else {
				name = conv["users"][0]["name"];
			}
			
			var message_array = conv["messages"];
			let return_code = null;
			if(message_array.length <= 0){
				return_code =
					<h4>Start a conversation with {name}!</h4>
			} else {
				var i;
				for(i = 0; i < message_array.length; i++){
					var style;
					var message = message_array[i]["body"];
					var time = message_array[i]["updatedAt"];
					if(message_array[i]["author"] === "me") {
						style = your_style;
					} else {
						style = their_style;
					}
					return_code =
						<span>{return_code}
							<div className="row">
								<span className={style}>
									<p className="row"> {message} </p>
									<p className="row right-align"> {time} </p>
								</span>
							</div>
						</span>
				}
			}


			return(
				<span>
					<span className="row">
						<h4 className="left-align">You are talking to {name}</h4>
					</span>
					<hr/>
					<div className="row message_space">
						{return_code}
					</div>
					<hr/>
					<form className="row valign-wrapper">
						<div className="col s10 m10 l10 input-field">
							<textarea 
								id="new_message" 
								className="materialize-textarea" 
								value={this.state.message_out}
								onChange={this.handleNewMessageChange}
							/>
							<label htmlFor="new_message" className="active">Type your message here</label>
						</div>
						<button 
							className="col s2 m2 l2 btn valign light-green"
							onClick={this.handleSendMessage}
						>Send
						</button>
					</form>
				</span>
			);
		} else {
			return (
				<span>
					<h4 className="left-align">You have no active conversations :( </h4>
					<p> Start a new conversation or revive an old one by searching for someone in the left bar! </p>
				</span>
			);
		}
	}


	handleNewMessageChange(ev) {
		var text = ev.target.value;
		this.setState({
			message_out: text,
		});
	}


	handleSendMessage(ev) {
		ev.preventDefault();
		console.log("chatpage.js -> handling send message..0");
		var msg = this.state.message_out;
		var chat_arr = this.props.chatArray;
		var curr_conv = parseInt(this.state.curr_conv);

		if ((!msg) || (typeof chat_arr !== "object") 
			|| (curr_conv > chat_arr.length) ) {
			//do nothing
			return null;
		}

		console.log("chatpage.js -> handling send message..1");

		var chat_id = chat_arr[curr_conv].conv_id;

		if (!chat_id) {
			//do nothing
			return null;
		}

		console.log("chatpage.js -> handling send message..2");

		this.props.handleSendMessage({
			message: msg,
			chat_id: chat_id,
		})
		.then(result => {
			console.log("chatpage.js -> handling send message..4");
		})
		.catch(err => {
			console.error("chatpage.js -> Error handling send message:" + err);
		})


	}
}

export default ChatPage;
