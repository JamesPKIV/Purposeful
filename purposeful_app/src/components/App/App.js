import React, { Component } from 'react';
import { Route, Redirect, HashRouter as Router } from 'react-router-dom';
import Dimensions from 'react-dimensions';
import { Button } from 'react-materialize';
import './App.css';
import NavBar from '../NavBar/NavBar.js';
import SignupContent from '../SignupContent/SignupContent.js';
import BelieveContent from '../BelieveContent/BelieveContent.js';
import DoContent from '../DoContent/DoContent.js';
import ContactContent from '../ContactContent/ContactContent.js';
import logo from './logo.png';
import * as firebase from 'firebase';



// Initialize Firebase connection
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
    };
    this.handleFormShow = this.handleFormShow.bind(this);
    this.show_button = this.show_button.bind(this);
  }


  /* called once app is rendered. set up refs to the Firebase mailing list */
  componentWillMount() {
    const dbRootRef = firebase.database().ref();
    const mlRef = dbRootRef.child('mailing_list');

    this.dbRootRef = dbRootRef;
    this.setState({ mailingListRef: mlRef });
  }

  /* show the form if the user wants to sign up */
  handleFormShow(history) {
    /* navigate to mailingList page if not there already*/
    if (history.location.pathname !== '/mailingList') {
      history.push('/mailingList');
    }
  }

  show_button(history){
    if (history.location.pathname !== '/mailingList'){
      return (
        <div className="learn-div">
          <button className="learn-btn btn" id="show-form" onClick={() => this.handleFormShow(history)} >Learn more</button>
        </div>

      );
    }
  }

  render() {
    /* actual DOM rendering */
    return (
      <Router>
        <section className="App">


          <header id="rectangle">

            <div className="logo-div">
              <img className="logo" src={logo} alt="logo" />
            </div>

            <div className="p-title-div">
              <h1 className="p-title">
                <span className="purposeCSS">Purpose</span>ful
              </h1>
            </div>

            <div className="nav-div">
              <NavBar containerWidth={this.props.containerWidth}/>
            </div>

          </header>
        


          <section className="App-main">
            <div className="move_in_mobile">

              {
                <Route render={ ({history}) => (
                  <div>

                  {this.show_button(history)}
                  </div>
                )}/>
              }
              <Route exact path="/" render={() => <Redirect to="/whatWeBelieve" />} />
              <Route path="/mailingList" render={() =>
                <SignupContent mlRef={this.state.mailingListRef} onFormUnmount={this.handleFormHide}
                  isFormShowing={true} />
              }/>
              <Route path="/whatWeDo" render={() => <DoContent />} />
              <Route path="/whatWeBelieve" render={() => <BelieveContent />} />
              <Route path="/contact" render={() => <ContactContent />} />
            </div>
          </section>

        </section>
      </Router>
    );
  }
}

export default Dimensions()(App);
