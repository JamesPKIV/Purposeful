import React, { Component } from 'react';
import { Route, Redirect, HashRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from '../NavBar/NavBar.js';
import SignupContent from '../SignupContent/SignupContent.js';
import BelieveContent from '../BelieveContent/BelieveContent.js';
import DoContent from '../DoContent/DoContent.js';
import ContactContent from '../ContactContent/ContactContent.js';

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
    this.state = {
      mailingListRef: null,
      isFormShowing: false,
    };
    this.handleFormShow = this.handleFormShow.bind(this);
    this.handleFormHide = this.handleFormHide.bind(this);
  }


  /* called once app is rendered. set up refs to the Firebase mailing list */
  componentWillMount() {
    const mlRef = firebase.database().ref().child('mailing_list');
    this.setState({ mailingListRef: mlRef });
  }

  handleFormHide() {
    this.setState({
      isFormShowing: false,
    });
  }

  /* show the form if the user wants to sign up */
  handleFormShow(history) {
    /* navigate to mailingList page if not there already*/
    if (history.location.pathname !== '/mailingList') {
      history.push('/mailingList');
    }
    this.setState({
      isFormShowing: true,
    });

  }

  render() {
    /* actual DOM rendering */
    return (
      <Router>
        <section className="App">

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        
            
            
          </header>

          <section className="App-main">
            <NavBar />
            <h1 className="p-title">Purposeful</h1>
            { 
              !this.state.isFormShowing &&
              <Route render={ ({ history}) => (
                <button id="show-form" onClick={() => this.handleFormShow(history)}>Join our Mailing List! </button>
              )} /> 
            }
            
            
            <Route exact path="/" render={() => <Redirect to="/whatWeBelieve" />} />
            <Route path="/whatWeBelieve" render={() => <BelieveContent />} />
            <Route path="/whatWeDo" render={() => <DoContent />} />
            <Route path="/contact" render={() => <ContactContent />} />
            <Route path="/mailingList" render={() => 
              <SignupContent mlRef={this.state.mailingListRef} onFormUnmount={this.handleFormHide} 
                isFormShowing={this.state.isFormShowing} /> } />
          </section>
        
        </section>
      </Router>
    );
  }
}

export default App;
