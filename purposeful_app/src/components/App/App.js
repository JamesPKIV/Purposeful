import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from '../SignupForm';
import SignupThanks from '../SignupThanks';
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
    this.handleFormReset = this.handleFormReset.bind(this);
    this.state = {
      first: '',
      last: '',
      email: '',
      mList: [],
      isSignedUp: false,
    };
  }

  /* called once app is rendered. set up refs to the Firebase mailing list*/
  componentWillMount() {
    const dbRootRef = firebase.database().ref();
    const mailingListRef = dbRootRef.child('mailing_list');

    this.dbRootRef = dbRootRef;
    this.mailingListRef = mailingListRef;

      /* set up firebase mailing list count listener */
    mailingListRef.on("child_added", snap => {
      /* store in local state the number of entries in Firebase mailing list */
      let newList = this.state.mList;
      newList.push(snap.value);

      this.setState({
        mList: newList
      });
    }).bind(this);

  }

  /*remove the DB update event listener */
  componentWillUnmount(){
    this.dbRootRef.off();
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
    let newEntry = {
      "first": this.state.first,
      "last": this.state.last,
      "email": this.state.email
    };

    let newUidRef = this.mailingListRef.push();
    /* send data to Firebase mailing list. entry stored at next available UID */
    let p1 = new Promise ( (resolve, reject) => {

      newUidRef.set(newEntry);
      resolve("Sucess!");
    });

    p1.then( msg => {
      alert("You have sucessfully joined our mailing list!");
      this.setState({isSignedUp: true});
    });
    

  }

  /* clear the form data and show form */
  handleFormReset() {
    this.setState({
      first: '',
      last: '',
      email: '',
      isSignedUp: false
    });

  }
  

  render() {
    /* conditionally render form content depending if youve signed up or not */
    let signupContent = null;
    
    signupContent = this.state.isSignedUp ? 
        <SignupThanks onClick={this.handleFormReset} /> : 
        <SignupForm className="Signup-Form" handleChange={this.handleInputChange} onClick={this.handleClick} /> ;
        

    /* actual DOM rendering */
    return (
      <section className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Purposeful!</h1>
          <h4>Democratizing the web through the free sharing of knowledge and great ideas.
          </h4>
        </header>

        <article>
            {signupContent}
        </article>
      
      </section>
    );
  }
}

export default App;
