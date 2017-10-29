import React, { Component } from 'react';
import './ChatPage.css';
import Tabs from 'react-tabs-navigation'
import NavBar from '../NavBar/NavBar';

class ChatPage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			tabs: [],
      active: 3
		};
    this.generate_tabs = this.generate_tabs.bind(this);
	}

  active_conversation(convid){
    /*get all these from convid instead of dummies or something like that*/
    var apos = "'"; /*to avoid editor complaining about non-closed apostrophe*/
    var name;
    var relation;
    var you_said;
    var they_said;
    var long_message;
    var your_style="col s5 m5 l5 left-align message light-green lighten-3";
    var their_style="col s5 m5 l5 push-l6 left-align message blue-grey lighten-3";
    var new_message_id;
    switch(convid){
      case 0:
        name = "somePerson 1";
        relation = "mentor";
        you_said = "This is something you said to somePerson 1";
        they_said= "this is something someperson 1 said to you";
        long_message = "this is also something else that you said to somePerson 1 that is very long because you were super excited about life and the universe and about being part of purposeful so you typed a bunch of stuff and sent a super long message";
        new_message_id = "new_message1"
        break;
      case 1:
        name = "somePerson 2";
        relation = "mentee";
        you_said = "This is something you said to somePerson 2";
        they_said= "this is something someperson 2 said to you";
        long_message = "this is also something else that you said to somePerson 2 that is very long because you were super excited about life and the universe and about being part of purposeful so you typed a bunch of stuff and sent a super long message";
        new_message_id = "new_message2"
        break;
      case 2:
        name = "somePerson 3";
        relation = "acquaintance";
        you_said = "This is something you said to somePerson 3";
        they_said= "this is something someperson 3 said to you";
        long_message = "this is also something else that you said to somePerson 3 that is very long because you were super excited about life and the universe and about being part of purposeful so you typed a bunch of stuff and sent a super long message";
        new_message_id = "new_message3"
        break;
      default:
        break;
    }
    return(
      <span>
        <span className="row">
          <h4 className="col s7 m7 l7 left-align">{name} is your {relation}</h4>
          <span className="col s5 m5 l5">
            <h5 className="col s5 m5 l5">Close tab <div onClick={()=>this.close_tab(convid)} className="btn light-green">X</div></h5>
            <p className="col s7 m7 l7">Don{apos}t worry, your conversations are not lost when you close tabs.</p>
          </span>
        </span>
        <hr/>

        {/*These woudl be generated dynamically depending on how many messages are in the database
          if there are no messages then instead of these we need to put something that says "you have
          not messaged this person before, start by introducing yourself!" (or something liek that)*/}
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

  close_tab(id){
    var the_tabs = this.state.tabs;
    var now_active = this.state.active;
    now_active -= 1;
    the_tabs.splice(id,1);
    this.setState({
      tabs: the_tabs,
      active: now_active
    });
    console.log(this.state.tabs);
  }

  generate_tabs(){
    console.log("generating tabs");
    var the_tabs = this.state.tabs;
    var i;
    var active = this.state.active;
    /*Instead of hard-coding 3, we should see how many active conversations
      the user has and make that be the number, then instead of name = "active
      conversation" + i, we should hace name = the name retreived from the database
      of that conversation entry.
      Then instad of calling active conversation with i as a parameter we would
      get the conversation id or something and send that to active_conversation
      function*/

    for (i = 0; i < active; i++){
      var name = "Active conversation "+ i;
      the_tabs.push({
        children: (
          <div>
            {this.active_conversation(i)}
          </div>
        ),
        displayName: name
      });
    }
  }

  render = () => {
    var apos = "'"; /*to avoid editor complaining about non-closed apostrophe*/
    if(this.state.tabs.length === 0){
      this.generate_tabs();
    }
    var tab_array = this.state.tabs;

    return(
      <span>
        <NavBar />
        <div className="main-content">
          <span className="row">
            <div className="col s3 m3 l3">
              <div className="col s10 m10 l10 push-l1 card-panel">
                <div className="row">
                  <h5>Find someone to chat with:</h5>
                  <div className="input-field inline">
                    <input id="chat_search" type="text"></input>
                    <label for="chat_search" className="active">Start typing someone{apos}s name:</label>
                  </div>
                </div>
                <div className="row">
                  <h5>Here are people you might be interested in connecting with:</h5>
                  <p> *Put an activity feed here or something of the sort with suggestions of
                      interesting people to talk to*</p>
                </div>
              </div>
            </div>
            <div className="col s9 m9 l9">
              <div className="col s12 m12 l12 card-panel">
                <Tabs
                tabs={tab_array}
                lineStyle={{
                  backgroundColor: '#8BC34A'
                }}
                tabsBarStyle={{
                  color: 'black'
                }}
                />
              </div>
            </div>
          </span>
        </div>
      </span>
    );
  }
}

export default ChatPage;
