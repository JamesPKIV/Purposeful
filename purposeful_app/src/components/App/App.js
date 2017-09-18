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

          <main className="mainContainer valign-wrapper"> {/*used to be page-content*/}
              <Route exact path="/" render={() => <Redirect to="/landing" />} />
              <Route path="/home" render={() => <HomePage />} />
              <Route path="/mentorship" render={() => <MentorshipPage />} />
              <Route path="/profile" render={() => <ProfilePage />} />
              <Route path="/login" render={() => <SignupPage />} />

              <Route path="/landing" render={() => <LandingPage />} />
              <Route path="/SEprofile" render={() => <SEProfilePage />} />
          </main>

          <footer className="page-footer grey darken-4">
            <div className = "row">
              <div className = "col s2 push-s4">
                <a href="dummy1">About_Purposeful</a>
              </div>
              <div className="col s2 push-s4">
                <a href="dummy2">Our_Team</a>
              </div>
              <div className= "col s2 push-s4">
                <a href="dummy3">Donate</a>
              </div>
              <div className="col s2 push-s4">
                <a href="dummy4">Privacy_Policy</a>
              </div>
            </div>
          </footer>

        </div>
      </Router>
    );
  }
}

export default Dimensions()(App);
