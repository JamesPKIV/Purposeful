import React, { Component } from 'react';
import { Link, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
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
import AboutPurposeful from '../AboutPurposeful/AboutPurposeful';
import OurTeam from '../OurTeam/OurTeam';
import DonateForm from '../DonateForm/DonateForm';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import StoriesPage from '../StoriesPage/StoriesPage';
import CollabPage from '../CollabPage/CollabPage';

import Client from "../../Client";

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoggedIn : false,
			userName: "",
			userEmail: "",
			userId: "",
			skills: [],
			interests: [],
			mentors: [],
			mentees: [],
			recommended: [],
			skillUsersMap: {},

		};

		this.footer = this.footer.bind(this);
		this.footerDesktop = this.footerDesktop.bind(this);
		this.footerMobile = this.footerMobile.bind(this);
		this.fetchMentorship = this.fetchMentorship.bind(this);
		this.fetchHome = this.fetchHome.bind(this);
	}


	fetchHome () {
		Client.get_mentorship_dash()
			.then (dash_data => {
				var mentees = dash_data["mentees"];
				var mentors = dash_data["mentors"];
				var recommended = dash_data["recommended"];

				console.log("MENTORSHIP DASH RECIEVED: ", dash_data);

				this.setState({
					mentees: mentees,
					mentors: mentors,
					recommended: recommended,
				});
			});
	}


	fetchMentorship () {
		Client.get_mentorship_dash()
			.then (dash_data => {
				var mentees = dash_data["mentees"];
				var mentors = dash_data["mentors"];
				var recommended = dash_data["recommended"];

				console.log("MENTORSHIP DASH RECIEVED: ", dash_data);

				this.setState({
					mentees: mentees,
					mentors: mentors,
					recommended: recommended,
				});
			});

	}



	searchBySkill (skill_name) {
		//todo: validate input

		var SU_Map = this.state.skillUsersMap;

		//retrieve users with the given skill and update the react state  
		return Client.get_users_with_skill(skill_name)
			.then(users  => {
				SU_Map[skill_name] = users;
				this.setState ({
					skillUsersMap: SU_Map,
				});
			})
			//throw errors on down to the calling page
			.catch( err => {
				throw err;
			});

	}


footerDesktop(){
    return(
      <footer className="page-footer grey darken-4">
        <div className = "row fullrow">
          <ul className="footer-links">
            <li><Link to="/about" className="desktop-font">About</Link></li>
            <li><Link to="/team" className="desktop-font">Our Team</Link></li>
            <li><Link to="/donate" className="desktop-font">Donate</Link></li>
            <li><Link to="/privacy" className="desktop-font">Privacy Policy</Link></li>
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
            <Link to="/about" className="mobile-font">About_Purposeful</Link>
          </div>
          <div className="col s3 right-align">
            <Link to="/team" className="mobile-font">Our_Team</Link>
          </div>
          <div className= "col s3">
            <Link to="/donate" className="mobile-font">Donate</Link>
          </div>
          <div className="col s3">
            <Link to="/privacy" className="mobile-font">Privacy_Policy</Link>
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
							<Route 
								exact path="/" 
								render={ () => <Redirect to="/landing" /> } 
							/>
							<Route 
								path="/home" 
								render={ () => <HomePage /> }
								userName={this.state.userName}
								fetchData={ () => this.fetchHome()}
								mentors={this.state.mentors}
							/>
							<Route 
								path="/mentorship"
								render={ () => <MentorshipPage /> }
								fetchData={() => this.fetchMentorship()}
								handleSearchBySkill={(skill) => this.searchBySkill(skill)}
								mentors={this.state.mentors}
								mentees={this.state.mentees}
								recommended={this.state.recommended}
								skillUsersMap={this.state.skillUsersMap}
							/>
							<Route 
								path="/profile" 
								render={ () => <ProfilePage /> } 
							/>
							<Route
								path="/login" 
								render={ () => <SignupPage /> } 
							/>
							<Route 
								path="/landing" 
									render={ () => <LandingPage /> } 
							/>
							<Route 
								path="/SEprofile" 
								render={ () => <SEProfilePage /> } 
							/>
							<Route 
								path="/interestskills" 
								render={ ()=> <InterestSkills/> } 
							/> 
              <Route path="/stories" render={()=> <StoriesPage/>} />
              <Route path="/collabs" render={()=> <CollabPage/>} />

              <Route path="/about" render={()=> <AboutPurposeful/>} />
              <Route path="/team" render={()=> <OurTeam/>} />
              <Route path="/donate" render={()=> <DonateForm/>} />
              <Route path="/privacy" render={()=> <PrivacyPolicy/>} />
					</main>
					{this.footer()}
				</div>
			</Router>
		);
	}
}

export default Dimensions()(App);
