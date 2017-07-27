import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './SignupForm';
import * as firebase from 'firebase';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPzk2vEV34o31xN-uJNt8BqMcc9hlVyv4",
  authDomain: "purposeful-718b4.firebaseapp.com",
  databaseURL: "https://purposeful-718b4.firebaseio.com",
  projectId: "purposeful-718b4",
  storageBucket: "purposeful-718b4.appspot.com",
  messagingSenderId: "842888689213"
};
firebase.initializeApp(config);


class App extends Component {
  constructor () {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      first: '',
      last: '',
      email: '',
      mListCount: null,
    };
  }

  /* called once app is rendered. set up refs to the Firebase mailing list*/
  componentDidMount() {
    const dbRootRef = firebase.database().ref();
    const mailingListRef = dbRootRef.child('mailing_list');
    const countRef = mailingListRef.child('count');

    this.mailingListRef = mailingListRef;
      /* set up firebase mailing list count listener */
    countRef.on("value", snap => {
      /* store in local state the number of entries in Firebase mailing list */
      this.setState({
        mListCount: snap.val()
      });
    });

  }

  /* updates the state when the user changes any input in the form */
  handleInputChange(event) {

    const inputName = event.target.name;
    const inputVal = event.target.value;

    this.setState({
      [inputName]: inputVal
    });
  }

  /* submits the form data to the Firebase mailing list */
  handleClick() {
    alert("Signup implemention in progress, but not working yet. Thanks for trying!");

    var newEntry = {
      "first": this.state.first,
      "last": this.state.last,
      "email": this.state.email
    };
    /* send data to Firebase mailing list */
    this.mailingListRef.set({
      [this.state.mListCount + 1]: newEntry,
      count: this.state.mListCount + 1
    });


  }
  

  render() {
    return (
      <section className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Purposeful!</h1>
          <h4>Democratizing the web through the free sharing of knowledge and great ideas.
          </h4>
        </header>


        <article>
          <section className="Signup-section">
            <SignupForm className="Signup-Form" handleChange={this.handleInputChange} onClick={this.handleClick} />
          </section>

          <section>
            <p>{this.state.first}</p>
            <p>{this.state.last}</p>
            <p>{this.state.email}</p>
          </section>
        </article>
      
      </section> /* end of "App" */
    );
  }
}

export default App;
