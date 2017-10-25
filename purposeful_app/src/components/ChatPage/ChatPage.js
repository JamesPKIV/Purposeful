import React, { Component } from 'react';
import './ChatPage.css';
import { Redirect, Link } from "react-router-dom";
import Tabs from 'react-tabs-navigation'
import NavBar from '../NavBar/NavBar';

class ChatPage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			/*state vars here*/
		};
    /*
    bind fcns here
    */
	}

  active_conversation(userid){
    /*get all these from userid instead of dummies or something like that*/
    var name;
    var relation;
    var you_said;
    var they_said;
    var long_message;
    var your_style="col s5 m5 l5 left-align message light-green lighten-3";
    var their_style="col s5 m5 l5 push-l6 left-align message blue-grey lighten-3";
    var new_message_id;
    switch(userid){
      case 1:
        name = "somePerson 1";
        relation = "mentor";
        you_said = "This is something you said to somePerson 1";
        they_said= "this is something someperson 1 said to you";
        long_message = "this is also something else that you said to somePerson 1 that is very long because you were super excited about life and the universe and about being part of purposeful so you typed a bunch of stuff and sent a super long message";
        new_message_id = "new_message1"
        break;
      case 2:
        name = "somePerson 2";
        relation = "mentee";
        you_said = "This is something you said to somePerson 2";
        they_said= "this is something someperson 2 said to you";
        long_message = "this is also something else that you said to somePerson 2 that is very long because you were super excited about life and the universe and about being part of purposeful so you typed a bunch of stuff and sent a super long message";
        new_message_id = "new_message2"
        break;
      case 3:
        name = "somePerson 3";
        relation = "acquaintance";
        you_said = "This is something you said to somePerson 3";
        they_said= "this is something someperson 3 said to you";
        long_message = "this is also something else that you said to somePerson 3 that is very long because you were super excited about life and the universe and about being part of purposeful so you typed a bunch of stuff and sent a super long message";
        new_message_id = "new_message3"
        break;
    }
    return(
      <span>
        <h4 className="row left-align">{name} is your {relation}</h4>
        <hr/>

        {/*These woudl be generated dynamically depending on how many messages are in the database*/}
        <div className="row message_space">
          <div className="row">
            <span className={your_style}>
              <p className="row"> {you_said} </p>
              <p className="row right-align"> Time stmp </p>
            </span>
          </div>
          <div className="row">
            <span className={their_style}>
              <p className="row"> {they_said} </p>
              <p className="row right-align"> Time stamp </p>
            </span>
          </div>
          <div className="row">
            <span className={your_style}>
              <p className="row"> {long_message} </p>
              <p className="row right-align"> Time stamp </p>
            </span>
          </div>
        </div>


        <hr/>
        <form className="row valign-wrapper">
          <div className="col s10 m10 l10 input-field">
            <textarea id={new_message_id} className="materialize-textarea"></textarea>
            <label for={new_message_id} className="active">Type your {new_message_id} here</label>
          </div>
          <div className="col s2 m2 l2 btn valign light-green">
            Send
          </div>
        </form>

      </span>
    );
  }

  render = () => {
    return(
      <span>
        <NavBar />
        <div className="main-content">
          <span className="row fullrow">
            <div className="col s2 m2 l2">
              <div className="row">
                Find someone to chat with:
                <div className="input-field inline">
                  <input id="chat_search" type="text"></input>
                </div>
              </div>
              <p> Find someone </p>
              <p> Here is where users look for someone they wanna message by name and start a new conversation.
              Maybe we could also have default suggestions of interesting people to talk to?</p>
            </div>
            <div className="col s10 m10 l10">
              <Tabs
              tabs={[
                {
                  children: () => (
                    <div>
                      {this.active_conversation(1)}
                    </div>
                  ),
                  displayName: 'Active converstation 1'
                },
                {
                  children: () => (
                    <div>
                      {this.active_conversation(2)}
                    </div>
                  ),
                  displayName: 'Active converstation 2'
                },
                {
                  children: () => (
                    <div>
                      {this.active_conversation(3)}
                    </div>
                  ),
                  displayName: 'Active Conversation 3'
                }
              ]}
              lineStyle={{
                backgroundColor: '#8BC34A'
              }}
              tabsBarStyle={{
                color: 'black'
              }}
              />
            </div>
          </span>
        </div>
      </span>
    );
  }
}

export default ChatPage;
