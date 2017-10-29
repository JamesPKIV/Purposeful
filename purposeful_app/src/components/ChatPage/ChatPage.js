import React, { Component } from 'react';
import './ChatPage.css';
import Tabs from 'react-tabs-navigation'
import NavBar from '../NavBar/NavBar';

class ChatPage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			conv_array: [
        {"conv_id": "0","user1":"me", "user2":"Hermione",
         "messages": [
           {"content":"This is a message that you sent to Hermione", "author":"1", "time_stamp":"TIME STAMP"},
           {"content":"This is a message that Hermione sent to you", "author":"0", "time_stamp":"TIME STAMP"},
           {"content":"This is a very very long message that you sent to Hermione because you are very excited about everything and I am trying to make this super long to see how it would look like but it is not long enough so I am gonna keep typing",
             "author":"1", "time_stamp":"TIME_STAMP"}
         ]},
         {"conv_id": "1","user1":"me", "user2":"Roald",
          "messages": [
            {"content":"This is a message that you sent to Roald", "author":"1", "time_stamp":"TIME STAMP"},
            {"content":"This is a message that Roald sent to you", "author":"0", "time_stamp":"TIME STAMP"},
            {"content":"This is a very very long message that you sent to Roald because you are very excited about everything and I am trying to make this super long to see how it would look like but it is not long enough so I am gonna keep typing",
              "author":"1", "time_stamp":"TIME_STAMP"}
          ]},
          {"conv_id": "2","user1":"me", "user2":"Aretha",
           "messages": [
             {"content":"This is a message that you sent to Aretha", "author":"1", "time_stamp":"TIME STAMP"},
             {"content":"This is a message that Aretha sent to you", "author":"0", "time_stamp":"TIME STAMP"},
             {"content":"This is a very very long message that you sent to Aretha because you are very excited about everything and I am trying to make this super long to see how it would look like but it is not long enough so I am gonna keep typing",
               "author":"1", "time_stamp":"TIME_STAMP"}
           ]},
      ],
      curr_conv: "1"
		};
	}

  render = () => {
    var apos = "'"; /*to avoid editor complaining about non-closed apostrophe*/
    return(
      <span>
        <NavBar/>
        <div className="main-content">
          <div className="row fullrow">
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
              {this.current_conversation()}
            </div>
          </div>
          </div>
        </div>
      </span>
    );
  }

  conversation_list(){
    var i;
    var array = this.state.conv_array;
    let return_code = null;
    for(i = 0; i < array.length; i++){
      var conv = array[i];
      var name;
      if(conv["user1"]==="me"){
        name = conv["user2"];
      } else {
        name = conv["user1"];
      }
      var conv_id = conv["conv_id"];
      console.log(name + " has id " + conv_id);
      let boundClick = this.change_conv.bind(this,conv_id);
      return_code =
        <span>{return_code}
          <div className="row">
            <div onClick={() => boundClick()} className="card-panel hoverable">{name}</div>
          </div>
        </span>
    }
    return return_code
  }

  change_conv(id){
    console.log("changing to id: "+ id);
    this.setState({
      curr_conv: id
    });
  }

  current_conversation(){
    var conv_id = parseInt(this.state.curr_conv);
    var array = this.state.conv_array;
    var conv = array[conv_id];
    var your_style="col s5 m5 l5 left-align message light-green lighten-3";
    var their_style="col s5 m5 l5 push-l6 left-align message blue-grey lighten-3";
    var name;
    if(conv["user1"]==="me"){
      name = conv["user2"];
    } else {
      name = conv["user1"];
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
        var message = message_array[i]["content"];
        var time = message_array[i]["time_stamp"];
        if(message_array[i]["author"] === "1"){
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
            <textarea id="new_message" className="materialize-textarea"></textarea>
            <label for="new_message" className="active">Type your message here</label>
          </div>
          <div className="col s2 m2 l2 btn valign light-green">
            Send
          </div>
        </form>
      </span>
    );
  }
}

export default ChatPage;
