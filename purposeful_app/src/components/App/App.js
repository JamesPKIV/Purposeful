import React, { Component } from 'react';
import { Link, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Dimensions from 'react-dimensions';

import './App.css';
import HomePage from '../HomePage/HomePage';
import MentorshipPage from '../MentorshipPage/MentorshipPage';
import ProfilePage from '../ProfilePage/ProfilePage';
/*import SignupPage from '../SignupPage/SignupPage';*/
import LandingPage from '../LandingPage/LandingPage';
import SEProfilePage from '../SEProfilePage/SEProfilePage';
import InterestSkills from '../InterestSkills/InterestSkills';
import AboutPurposeful from '../AboutPurposeful/AboutPurposeful';
import OurTeam from '../OurTeam/OurTeam';
import DonateForm from '../DonateForm/DonateForm';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import StoriesPage from '../StoriesPage/StoriesPage';
import StoriesManage from '../StoriesManage/StoriesManage';
import StoriesNew from '../StoriesNew/StoriesNew';
import CollabPage from '../CollabPage/CollabPage';
import EditProfile from '../EditProfile/EditProfile';
import SettingsPage from '../SettingsPage/SettingsPage';
import HelpPage from '../HelpPage/HelpPage';
import ChatPage from '../ChatPage/ChatPage';

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
			skillsUsersMap: {},
			prof_past: "",
			prof_present: "",
			prof_future: "",
			SE_profile: {},
		};

		this.footer = this.footer.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.handleSubmitSI = this.handleSubmitSI.bind(this);
		this.fetchHome = this.fetchHome.bind(this);
		this.fetchMentorship = this.fetchMentorship.bind(this);
		this.searchBySkill = this.searchBySkill.bind(this);
		this.setStateAttr = this.setStateAttr.bind(this);
		this.pushToStateAttrArr = this.pushToStateAttrArr.bind(this);
		this.handleSubmitProfileChange = this.handleSubmitProfileChange.bind(this);
		this.fetchSEProfile = this.fetchSEProfile.bind(this);
		this.handleMentorRequest = this.handleMentorRequest.bind(this);
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


	handleLogin(password) {
		var email = this.state.userEmail;

		return Client.login(email, password)
			.then(user_obj => {
				this.setState({
					userId: user_obj.id,
					userName: user_obj.name,
					prof_past: user_obj.past,
					prof_present: user_obj.present,
					prof_future: user_obj.future,
					isLoggedIn: true,
				});
				return user_obj;
			})
			.catch(err => {
				throw err;
			});
	}


	handleLogout(){
		 return Client.logout().then(res => {
			console.log("Session was destroyed and user should be logged out.");
		 })
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
		return Client.get_mentorship_dash()
			.then (dash_data => {
				var user_obj = dash_data["user"];
				var mentees = dash_data["mentees"];
				var mentors = dash_data["mentors"];
				var recommended = dash_data["recommended"];

				console.log("HOME DASH RECIEVED: ", dash_data);

				this.setState({
					mentees: mentees,
					mentors: mentors,
					recommended: recommended,
					userId: user_obj.id,
					userName: user_obj.name,
					prof_past: user_obj.past,
					prof_present: user_obj.present,
					prof_future: user_obj.future,
					isLoggedIn: true,
				});
			})
			.catch (err => {
				throw err;
			});
	}


	fetchMentorship () {
		return Client.get_mentorship_dash(this.state.userId)
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


	fetchSEProfile (SEuserId) {

		if (!SEuserId){
			var msg = "No user was specified";
			throw new Error(msg);
		}
		return Client.get_user_by_uid(SEuserId)
			.then( SE_data => {
				this.setState({
					SE_profile: SE_data
				});


				console.log("MENTORSHIP DASH RECIEVED: ", SE_data);
			})
			.catch(err => {
				throw err;
			});
	}



	searchBySkill (skill_name) {
		//todo: validate input


		//retrieve users with the given skill and update the react state
		return Client.get_users_with_skill(skill_name)
			.then(users  => {
				var SU_Map = this.state.skillsUsersMap;
				SU_Map[skill_name] = users;
				this.setState ({
					skillsUsersMap: SU_Map,
				});
			})
			//throw errors on down to the calling page
			.catch( err => {
				console.log("(App.js) Error getting user with skill "+ skill_name +":");
				console.log(err);
				throw err;
			});
	}

	handleSubmitProfileChange () {
		var past_str = this.state.prof_past;
		var present_str = this.state.prof_present;
		var future_str = this.state.prof_future;
		return Client.update_profile(past_str, present_str, future_str)
			.then (profile_data => {
				var past = profile_data["past"];
				var present = profile_data["present"];
				var future = profile_data["future"];

				console.log("Profile Updated: ", profile_data);

				this.setState({
					prof_past: past,
					prof_present: present,
					prof_future: future,
				});
			})
			.catch (err => {
				throw err;
			});
	}

	/* this function makes a mentor request with the message argument */
	handleMentorRequest (messageFromMentee) {
		var se_user_id = this.state.SE_profile.id;
		if (!se_user_id) {
			var err_msg = "No mentor was specified";
			throw new Error(err_msg);
		}
		return Client.add_mentor_request(se_user_id, messageFromMentee);
	}



	handleSEProfileClick(se_uid) {
		this.setStateAttr("SE_userId", se_uid);
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

footer(){
    return(
      <footer className="page-footer grey darken-4">
        <div className = "row ">
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

	render() {
		return (
			<Router>
				<div className="App">

					<header className="head-content">
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
								handleLogin={this.handleLogin}
								handleNameSet={this.setStateAttr.bind(this,"userName") }
								handleEmailSet={this.setStateAttr.bind(this, "userEmail") }
								isLoggedIn={this.state.isLoggedIn}
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
							render={ (props) =>
								<HomePage
									userName={this.state.userName}
									userId={this.state.userId}
									fetchData={this.fetchHome}
									isLoggedIn={this.state.isLoggedIn}
                  mentors={this.state.mentors}
									mentees={this.state.mentees}
									recommended={this.state.recommended}
									logout={this.handleLogout}
                  {...props}
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
									skillsUsersMap={this.state.skillsUsersMap}
									handleSetSEUserID={this.setStateAttr.bind(this, "SE_userId")}
								/>
							}
						/>


						<Route
							path="/profile"
							render={ () =>
								<ProfilePage
									isLoggedIn={this.state.isLoggedIn}
									userName={this.state.userName}
									past={this.state.prof_past}
									present={this.state.prof_present}
									future={this.state.prof_future}
									handleChangePast={this.setStateAttr.bind(this, "prof_past")}
									handleChangePresent={this.setStateAttr.bind(this, "prof_present")}
									handleChangeFuture={this.setStateAttr.bind(this, "prof_future")}
									handleSubmitChange={this.handleSubmitProfileChange}
									userId={this.state.userId}
									fetchData={this.fetchHome}
									mentors={this.state.mentors}
									mentees={this.state.mentees}
							  /> }
						/>


						<Route
							path="/SEprofile/:id"
							render={ ({ match }) =>
								<SEProfilePage
									fetchHome={this.fetchHome}
									fetchSEProfile={this.fetchSEProfile}
									match={match}
									SEProfile={this.state.SE_profile}
									handleMentorRequest={this.handleMentorRequest}
								/>
							}
						/>

              <Route
                path="/stories"
                render={ () => <StoriesPage /> }
              />
							<Route
                path="/newstories"
                render={ () => <StoriesNew /> }
              />
							<Route
                path="/managestories"
                render={ () => <StoriesManage /> }
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
							<Route
								path="/settings"
								render={ () => <SettingsPage /> }
							/>
							<Route
								path="/help"
								render={ () => <HelpPage /> }
							/>
							<Route
							  path="/chat"
								render={ () => <ChatPage /> }
							/>
					</main>
					{this.footer()}
				</div>
			</Router>
		);
	}
}

export default Dimensions()(App);
