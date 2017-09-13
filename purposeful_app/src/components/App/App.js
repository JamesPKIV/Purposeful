import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Dimensions from 'react-dimensions';


import './App.css';
import logo from './logo.png'
import NavBar from '../NavBar/NavBar'
import HomePage from '../HomePage/HomePage'
import MentorshipPage from '../MentorshipPage/MentorshipPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import SignupPage from '../SignupPage/SignupPage'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="head-content">
            {
              <NavBar containerWidth={this.props.containerWidth}/>
            }
          </header>

          <section className="page-content">
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" render={() => <HomePage />} />
              <Route path="/mentorship" render={() => <MentorshipPage />} />
              <Route path="/profile" render={() => <ProfilePage />} />
              <Route path="/login" render={() => <SignupPage />} />
          </section>


        </div>
      </Router>
    );
  }
}

export default Dimensions()(App);
