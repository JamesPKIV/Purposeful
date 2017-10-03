import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Dimensions from 'react-dimensions';

import './App.css';
import NavBar from '../NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import MentorshipPage from '../MentorshipPage/MentorshipPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SignupPage from '../SignupPage/SignupPage';
import LandingPage from '../LandingPage/LandingPage';
import SEProfilePage from '../SEProfilePage/SEProfilePage';
import InterestSkills from '../InterestSkills/InterestSkills';

class App extends Component {
  constructor(props){
    super(props);
    this.footer = this.footer.bind(this);
    this.footerDesktop = this.footerDesktop.bind(this);
    this.footerMobile = this.footerMobile.bind(this);
  }


  footerDesktop(){
    return(
      <footer className="page-footer grey darken-4">
        <div className = "row fullrow">
          <ul className="footer-links">
            <li><a href="dummy1" className="desktop-font">About</a></li>
            <li><a href="dummy2" className="desktop-font">Our Team</a></li>
            <li><a href="dummy3" className="desktop-font">Donate</a></li>
            <li><a href="dummy4" className="desktop-font">Privacy Policy</a></li>
          </ul>
        </div>
      </footer>
    );
  }

  footerMobile(){
    return(
      <footer className="page-footer grey darken-4">
        <div className = "row fullrow">
          <div className = "col s3 left-align">
            <a href="dummy1" className="mobile-font">About_Purposeful</a>
          </div>
          <div className="col s3 right-align">
            <a href="dummy2" className="mobile-font">Our_Team</a>
          </div>
          <div className= "col s3">
            <a href="dummy3" className="mobile-font">Donate</a>
          </div>
          <div className="col s3">
            <a href="dummy4" className="mobile-font">Privacy_Policy</a>
          </div>
        </div>
      </footer>
    );
  }

  footer(props){
    if (this.props.containerWidth >= 700) {
      return(
        this.footerDesktop()
      );
    } else {
      return (
        this.footerMobile()
      );
    }
  }



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

          <main className="valign-wrapper"> {/*used to be page-content*/}
              <Route exact path="/" render={() => <Redirect to="/landing" />} />
              <Route path="/home" render={() => <HomePage />} />
              <Route path="/mentorship" render={() => <MentorshipPage />} />
              <Route path="/profile" render={() => <ProfilePage />} />
              <Route path="/login" render={() => <SignupPage />} />

              <Route path="/landing" render={() => <LandingPage />} />
              <Route path="/SEprofile" render={() => <SEProfilePage />} />
              <Route path="/interestskills" render={()=> <InterestSkills/>} />
          </main>
          {this.footer()}
        </div>
      </Router>
    );
  }
}

export default Dimensions()(App);
