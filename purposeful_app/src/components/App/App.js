import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Dimensions from 'react-dimensions';
import {Footer} from 'react-materialize';

import './App.css';
import logo from './logo.png'
import NavBar from '../NavBar/NavBar'
import HomePage from '../HomePage/HomePage'
import MentorshipPage from '../MentorshipPage/MentorshipPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import SignupPage from '../SignupPage/SignupPage'
import LandingPage from '../LandingPage/LandingPage'
import SEProfilePage from '../SEProfilePage/SEProfilePage'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <header className="head-content">
            {/*
              NOTE: to be congruent with materialize the nav bar would need to
              be within the same container as the one that renders the pages.
              <NavBar containerWidth={this.props.containerWidth}/>
            */}
          </header>

          <section className="mainContainer valign-wrapper"> {/*used to be page-content*/}
              <Route exact path="/" render={() => <Redirect to="/landing" />} />
              <Route path="/home" render={() => <HomePage />} />
              <Route path="/mentorship" render={() => <MentorshipPage />} />
              <Route path="/profile" render={() => <ProfilePage />} />
              <Route path="/login" render={() => <SignupPage />} />

              <Route path="/landing" render={() => <LandingPage />} />
              <Route path="/SEprofile" render={() => <SEProfilePage />} />

              <div className="container">
                <footer className="page-footer">
                  <div class = "row grey darken-4">
                    <div class = "col s12">
                      <h5 class = "white-text">Footer Content</h5>
                    </div>
                    <div class = "col">
                      <ul>
                        <li><a href="dummy1"> _About_Purposeful_ </a></li>
                        <li><a href="dummy2"> _Our_Team_ </a></li>
                        <li><a href="dummy3"> _Donate_ </a></li>
                        <li><a href="dummy4"> _Privacy_Policy_ </a></li>
                      </ul>
                    </div>
                  </div>
                </footer>
              </div>
          </section>





        </div>
      </Router>
    );
  }
}

export default Dimensions()(App);
