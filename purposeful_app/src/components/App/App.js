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
import EditProfile from '../EditProfile/EditProfile';

import Client from "../../Client";

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoggedIn : false,
			userName: "James",
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
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.handleSubmitSI = this.handleSubmitSI.bind(this);
		this.fetchHome = this.fetchHome.bind(this);
		this.fetchMentorship = this.fetchMentorship.bind(this);
		this.searchBySkill = this.searchBySkill.bind(this);
		this.setStateAttr = this.setStateAttr.bind(this);
		this.pushToStateAttrArr = this.pushToStateAttrArr.bind(this);
	}


	handleCreateUser (password) {
		var name = this.state.userName;
		var email = this.state.userEmail;

		return Client.add_new_user(name, email, password)
			.then(user_obj => {
				this.setState({
					userId: user_obj.id,
					isLoggedIn: true,
				}); 
				return user_obj;
			})
			.catch(err => {
				throw err;
			});
	}


	handleSubmitSI() {
		var interests = this.state.interests;
		var skills = this.state.skills;
		var user_id = this.state.userId;
		return Client.add_skills_and_interests(user_id, skills, interests)
			.then( skillsIntrs => {
				console.log("Successfully added skills/interests:", skillsIntrs);
			})
			.catch( error => {
				throw error;
			});
	}


	fetchHome () {
		Client.get_mentorship_dash(this.state.userId)
			.then (dash_data => {
				var mentees = dash_data["mentees"];
				var mentors = dash_data["mentors"];
				var recommended = dash_data["recommended"];

				console.log("HOME DASH RECIEVED: ", dash_data);

				this.setState({
					mentees: mentees,
					mentors: mentors,
					recommended: recommended,
				});
			})
			.catch (err => {
				throw err;
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


	setStateAttr(key, value) {
		this.setState({
			[key]: value
		});
	}

	pushToStateAttrArr(key, value) {

		var attr_arr = this.state[key];

		console.log("pushToStateAttrArr:", attr_arr);

		attr_arr.push(value);
		this.setState({
			[key]: attr_arr,
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
								path="/landing" 
								render={ () => <LandingPage 
									userName={this.state.userName}
									userEmail={this.state.userEmail}
									handleCreateUser={this.handleCreateUser} 
									handleNameSet={this.setStateAttr.bind(this,"userName") }
									handleEmailSet={this.setStateAttr.bind(this, "userEmail") }
								/>} 
							/>

							<Route 
								path="/interestskills" 
								render={ ()=> 
									<InterestSkills
										userName={this.state.userName}
										userEmail={this.state.userEmail}
										interests={this.state.interests}
										skills={this.state.skills}
										handleAddSkill={this.pushToStateAttrArr.bind(this, "skills") }
										handleAddInterest={this.pushToStateAttrArr.bind(this, "interests") }
										handleSubmit={this.handleSubmitSI}
									/> 
								} 
							/> 

							<Route 
								path="/home" 
								render={ () => 
									<HomePage 
										userName={this.state.userName}
										userId={this.state.userId}
										fetchData={this.fetchHome}
										isLoggedIn={this.state.isLoggedIn}
										mentors={this.state.mentors}
										mentees={this.state.mentees}
										recommended={this.state.recommended}
									/> 
								}	
							/>
							<Route 
								path="/mentorship"
								render={ () => 
									<MentorshipPage 
										fetchData={this.fetchMentorship}
										handleSearchBySkill={this.searchBySkill}
										mentors={this.state.mentors}
										mentees={this.state.mentees}
										recommended={this.state.recommended}
										skillUsersMap={this.state.skillUsersMap}
									/> 
								}
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
								path="/SEprofile" 
								render={ () => <SEProfilePage /> } 
							/>
              <Route 
                path="/stories" 
                render={ () => <StoriesPage /> } 
              />
              <Route 
                path="/collabs" 
                render={ () => <CollabPage /> }
              />
              <Route 
                path="/editProfile" 
                render={ () => <EditProfile /> } 
              />
              <Route 
                path="/about" 
                render={ () => <AboutPurposeful /> } 
              />
              <Route 
                path="/team" 
                render={ () => <OurTeam /> } 
              />
              <Route 
                path="/donate" 
                render={ () => <DonateForm /> } 
              />
              <Route 
                path="/privacy" 
                render={ () => <PrivacyPolicy /> } 
              />
					</main>
					{this.footer()}
				</div>
			</Router>
		);
	}
}

export default Dimensions()(App);
