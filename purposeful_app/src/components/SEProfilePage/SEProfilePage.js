import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SEProfilePage.css';
import NavBar from '../NavBar/NavBar';
import profile_pic from './profile-pic-default.jpg';
import project_pic from './project-pic-default.jpg';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaUserTimes from 'react-icons/lib/fa/user-times';
import FaUserPlus from 'react-icons/lib/fa/user-plus';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

class SEProfilePage extends Component {

	constructor (props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.purpose_content = this.purpose_content.bind(this);
		this.goals_content = this.goals_content.bind(this);
		this.accomplish_content = this.accomplish_content.bind(this);
		this.pull_mentors = this.pull_mentors.bind(this);
		this.pull_mentees = this.pull_mentees.bind(this);
		this.pull_stories = this.pull_stories.bind(this);
		this.pull_collab = this.pull_collab.bind(this);
		this.ask_mentee = this.ask_mentee.bind(this);
		this.invite_collab = this.invite_collab.bind(this);
		this.follow = this.follow.bind(this);
		this.state = {
			isLoggedIn : false,
			purposeDisplay : false,
			goalsDisplay : false,
			accomplisDisplay: false,
			askMentee: false,
			inviteCollab: false,
			follow: false,
			requestSent: false,
			inviteSent: false
		};
  }

	toggle(to_toggle){
		switch(to_toggle){
			case "isLoggedIn":
				this.setState({
					isLoggedIn: !this.state.isLoggedIn
				});
				break;
			case "purposeDisplay":
				this.setState({
					purposeDisplay: !this.state.purposeDisplay
				});
				break;
			case "goalsDisplay":
				this.setState({
					goalsDisplay: !this.state.goalsDisplay
				});
				break;
			case "accomplishDisplay":
				this.setState({
					accomplishDisplay: !this.state.accomplishDisplay
				});
				break;
			case "askMentee":
				this.setState({
					askMentee: !this.state.askMentee
				});
				break;
			case "inviteCollab":
				this.setState({
					inviteCollab: !this.state.inviteCollab
				});
				break;
			case "follow":
				this.setState({
					follow: !this.state.follow
				});
				break;
			case "requestSent":
				this.setState({
					requestSent: !this.state.requestSent
				});
				this.setState({
					askMentee: !this.state.askMentee
				});
				break;
			case "inviteSent":
				this.setState({
					inviteSent: !this.state.inviteSent
				});
				this.setState({
					inviteCollab: !this.state.inviteCollab
				});
				break;
			default:
				break;
		}
	}

	purpose_content(){
			if(this.state.purposeDisplay){
				return(
					<div className="card-panel">
						<p className="profile-titles">
							Doing
							<button onClick={() => this.toggle("purposeDisplay")} className="btn-flat">
								<FaAngleUp className="profile-titles"></FaAngleUp>
							</button>
						</p>
						<p className="profile-text valign">Write in this space current personal,
						inter-personal, professional, or organizational projects you are working
						on. Try to explain why these projects make you excited, and the ways
						they relate to your experience, skills, and interests.</p>
					</div>
				);
			} else {
				return(
					<div className="card-panel">
						<p className="profile-titles ">
							Doing
							<button onClick={() => this.toggle("purposeDisplay")}  className="btn-flat">
								<FaAngleDown className="profile-titles"></FaAngleDown>
							</button>
						</p>
						<p className="profile-text truncate valign">Write in this space current personal,
						inter-personal, professional, or organizational projects you are working
						on. Try to explain why these projects make you excited, and the ways
						they relate to your experience, skills, and interests.</p>
					</div>
				);
			}
	}

	goals_content(){
		if(this.state.goalsDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						Will do
						<button onClick={() => this.toggle("goalsDisplay")} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
					</p>
					<p className="profile-text valign">Write in this space anything that
					you wish to do in the future. They can be ready-to-start
					ideas, half-baked ideas, long-term goals, personal goals, new-year
					resolutions, crazy dreams, or anything you wish you knew more about!</p>
				</div>
			);
		} else {
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						Will do
						<button onClick={() => this.toggle("goalsDisplay")}  className="btn-flat">
							<FaAngleDown className="profile-titles"></FaAngleDown>
						</button>
					</p>
					<p className="profile-text truncate valign">Write in this space anything that
					you wish to do in the future. They can be ready-to-start
					ideas, half-baked ideas, long-term goals, personal goals, new-year
					resolutions, crazy dreams, or anything you wish you knew more about!</p>
				</div>
			);
		}
	}

	accomplish_content(){
		if(this.state.accomplishDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						Did
						<button onClick={() => this.toggle("accomplishDisplay")} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
					</p>
					<p className="profile-text valign">Write in this space anything that
					you feel proud you have accomplished. It could include your academic
					achievements, personal challenges that you have defeated, places you
					have traveled to, hobbies you have learned, or anything else you can
					think about!</p>
				</div>
			);
		} else {
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						Did
						<button onClick={() => this.toggle("accomplishDisplay")}  className="btn-flat">
							<FaAngleDown className="profile-titles"></FaAngleDown>
						</button>
					</p>
					<p className="profile-text truncate valign">Write in this space anything that
					you feel proud you have accomplished. It could include your academic
					achievements, personal challenges that you have defeated, places you
					have traveled to, hobbies you have learned, or anything else you can
					think about!</p>
				</div>
			);
		}
	}

	pull_mentors(){
		return(
			<div className="row valign-wrapper">
				<ActivityFeed linkTo="/SEProfile" />
				<div className="col s2 m2 l2valign">
					<button  className="btn-flat">
						<FaAngleRight className="profile-name"></FaAngleRight>
					</button>
				</div>
			</div>
		);
	}

	pull_mentees(){
		return(
			<div className="row valign-wrapper">
				<ActivityFeed linkTo="/SEProfile" />
				<div className="col s2 m2 l2 valign">
					<button className="btn-flat">
						<FaAngleRight className="profile-name"></FaAngleRight>
					</button>
				</div>
			</div>
		);
	}

	pull_stories(){
		return(
			<div className="row">
				<div className="collection">
					<Link to="/stories" className="collection-item green-text">
						How I decided I needed to plant my own garden
					</Link>
					<Link to="/stories" className="collection-item green-text">
						Choosing the best socks for your interview
					</Link>
					<Link to="/stories" className="collection-item green-text">
						How I came up with a human-size hamster-ball floating on water idea
					</Link>
					<Link to="/stories" className="collection-item green-text">
						The time I opened my own restaurant
					</Link>
				</div>
			</div>
		);
	}

	pull_collab(){
		return(
			<div className="row">

				<div className="col s4 m3 l3">
					<div className="card">
						<div className="card-image">
							<img src={project_pic} alt=""/>
						</div>
						<div className="card-content collabCard-text">
							Thinking Sofas: We strive to build sofas that help you reach
							those wonderful philosophical ideas.
						</div>
						<div className="card-action light-green">
							<Link to="/collabs" className="white-text">Learn More</Link>
						</div>
					</div>
				</div>


				<div className="col s4 m3 l3">
					<div className="card ">
						<div className="card-image">
							<img src={project_pic} alt=""/>
						</div>
						<div className="card-content collabCard-text">
							We created a community garden at our neighborhood, we can help
							you start on at your neighborhood too!
						</div>
						<div className="card-action light-green">
							<Link to="/collabs" className="white-text">Learn More</Link>
						</div>
					</div>
				</div>

				<div className="col s4 m3 l3">
					<div className="card">
						<div className="card-image">
							<img src={project_pic} alt=""/>
						</div>
						<div className="card-content collabCard-text">
							Annyone who wants to quit smoking, we can do it together!
						</div>
						<div className="card-action light-green">
							<Link to="/collabs" className="white-text">Learn More</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	ask_mentee(){
		if (this.state.askMentee){
			return(
				<div className="input-field col s10 m10 l10 push-l1">
					<textarea id="ask_message" className="materialize-textarea"></textarea>
					<label for="ask_message" className="active">Tell Jane why you think she would be a good mentor for you</label>
					<button onClick={() => this.toggle("requestSent")} className="btn-large waves-effect light-green"> Send Request! </button>
				</div>
			);
		} else {
			return(
				<div className="row"> <p> </p> </div>
			);
		}
	}

	invite_collab(){
		if(this.state.inviteCollab){
			return(
				<div className="input-field col s10 m10 l10 push-l1">
					<textarea id="ask_message" className="materialize-textarea"></textarea>
					<label for="ask_message" className="active">Tell Jane why you think she would be a good part of your team</label>
					<button onClick={() => this.toggle("inviteSent")} className="btn-large waves-effect light-green"> Send Invitation! </button>
				</div>
			);
		} else {
			return(
				<div className="row"> <p> </p> </div>
			);
		}
	}

	follow(to_show){
		if(this.state.follow){
			if(to_show === "desktop"){
				return(
					<div className="col s4 m4 l4">
						<button onClick={() => this.toggle("follow")} className="btn-large waves-effect light-green darken-3">
							Stop Following <FaUserTimes className="profile-text"></FaUserTimes>
						</button>
					</div>
				);
			} else {
				return(
					<div className="row">
						<button onClick={() => this.toggle("follow")} className="btn waves-effect light-green darken-3">
							Unfollow <FaUserTimes className="profile-text"></FaUserTimes>
						</button>
					</div>
				);
			}
		} else {
			if(to_show === "desktop"){
				return(
					<div className="col s4 m4 l4">
						<button onClick={() => this.toggle("follow")} className="btn-large waves-effect light-green">
							Follow their Activity <FaUserPlus className="profile-text"></FaUserPlus>
						</button>
					</div>
				);
			} else {
				return(
					<div className="row">
						<button onClick={() => this.toggle("follow")} className="btn waves-effect light-green">
							Follow <FaUserPlus className="profile-text"></FaUserPlus>
						</button>
					</div>
				);
			}
		}
	}

	ask_button(){
		if(this.state.askMentee){
			return(
				<button onClick={() => this.toggle("askMentee")} className="btn-large waves-effect light-green darken-3"> Cancel </button>
			);
		} else {
			if(this.state.requestSent){
				return(
					<button onClick={() => this.toggle("askMentee")} className="btn-large waves-effect light-green disabled"> Mentor Request Sent </button>
				);
			} else {
				return(
					<button onClick={() => this.toggle("askMentee")} className="btn-large waves-effect light-green"> Become their Mentee </button>
				);
			}
		}
	}

	invite_button(){
		if(this.state.inviteCollab){
			return(
				<button onClick={() => this.toggle("inviteCollab")} className="btn-large waves-effect light-green darken-3"> Cancel </button>
			);
		} else {
			if(this.state.inviteSent){
				return(
					<button onClick={() => this.toggle("inviteCollab")} className="btn-large waves-effect light-green disabled"> Invitation to collab Sent </button>
				);
			} else {
				return(
					<button onClick={() => this.toggle("inviteCollab")} className="btn-large waves-effect light-green"> Invite to Collaborate </button>
				);
			}
		}
	}

	displayDesktop(){
		return(
			<div>
				<NavBar/>
				<div className="row fullrow main-content">
					<div className="col s4 m4 l4">
						<img className="responsive-img circle" src={profile_pic} alt=""/>
						<p className="profile-name"> Jane Doe </p>
						<div className="container">
								{this.purpose_content()}
								{this.goals_content()}
								{this.accomplish_content()}
						</div>
					</div>

					<div className="col s8 m8 l8">
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<div className="col s4 m4 l4">
								{this.ask_button()}
							</div>
							<div className="col s4 m4 l4">
								{this.invite_button()}
							</div>
							{this.follow("desktop")}
						</div>
						{this.ask_mentee()}
						{this.invite_collab()}
						<div className="row"> <p> </p> </div>
						<div className="row">
							<div className="col s10 m10 l10 push-l1">

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 m2 l2 profile-titles valign">Mentors</p>
										<p className="col s10 m10 l10 profile-text valign">These are people who have
										guided Jane towards her goals.</p>
									</div>
									{this.pull_mentors()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 m2 l2 profile-titles valign">Mentees</p>
										<p className="col s10 m10 l10 profile-text valign">These are people who have
										been supported by Jane to achieve their goals.</p>
									</div>
									{this.pull_mentees()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 m2 l2 profile-titles valign">Stories</p>
										<p className="col s10 m10 l10 profile-text valign">Learn more about how
										Jane got to where she is today.</p>
									</div>
									{this.pull_stories()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s3 m3 l3 profile-titles valign">Collaborations</p>
										<p className="col s9 m9 l9 profile-text valign">These are the projects
										that Jane is currenly working on.</p>
									</div>
										{this.pull_collab()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	displayMobile(){
		return(
			<div>
				<NavBar/>
				<div className="row fullrow main-content">
						<div className="col s5 m5 l5">
							<img className="responsive-img circle" src={profile_pic} alt=""/>
							<p className="profile-name"> Jane Doe </p>
						</div>

						<div className="col s6 m6 l6 ">
							<div className="row">
								{this.ask_button()}
							</div>
							<div className="row">
								{this.invite_button()}
							</div>
							{this.follow("mobile")}
						</div>
				</div>
				<div className="row fullrow">
					{this.purpose_content()}
					{this.goals_content()}
					{this.accomplish_content()}
				</div>
				<div className="row fullrow">
					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Mentors</p>
							<p className="profile-text">These are people who have
							guided Jane towards her goals.</p>
						</div>
						{this.pull_mentors()}
					</div>

					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Mentees</p>
							<p className="profile-text">These are people who have
							been supported by Jane to achieve their goals.</p>
						</div>
						{this.pull_mentees()}
					</div>

					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Stories</p>
							<p className="profile-text">Learn more about how
							Jane got to where she is today.</p>
						</div>
						{this.pull_stories()}
					</div>

					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Collaborations</p>
							<p className="profile-text">These are the projects
							that Jane is currenly working on.</p>
						</div>
							{this.pull_collab()}
					</div>
				</div>
			</div>
		);
	}

	render(){
		if(window.innerWidth > 700){
			return(
				this.displayDesktop()
			);
		} else {
			return(
				this.displayMobile()
			);
		}
	}
}

export default SEProfilePage;
