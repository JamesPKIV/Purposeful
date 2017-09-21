import React, { Component } from 'react';
import './SEProfilePage.css';
import profile_pic from './profile-pic-default.jpg';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

class SEProfilePage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false,
			purposeDisplay : false,
			goalsDisplay : false,
			accomplisDisplay: false
		};
  }

	togglePurpose = () => {
		console.log ("toggle activated");
		this.setState({
			purposeDisplay: !this.state.purposeDisplay
		});
	}

	toggleGoals = () => {
		this.setState({
			goalsDisplay: !this.state.goalsDisplay
		});
	}

	toggleAccomplish = () => {
		this.setState({
			accomplishDisplay: !this.state.accomplishDisplay
		});
	}

	purpose_content(){
		if(this.state.purposeDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						Doing
						<button onClick={this.togglePurpose} className="btn-flat">
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
						<button onClick={this.togglePurpose}  className="btn-flat">
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
						<button onClick={this.toggleGoals} className="btn-flat">
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
						<button onClick={this.toggleGoals}  className="btn-flat">
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
						<button onClick={this.toggleAccomplish} className="btn-flat">
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
						<button onClick={this.toggleAccomplish}  className="btn-flat">
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
			{/*This will be the format used but profiles will be drawn
				dynamically from database and horizontal scroll will only
				happen if there are more than 5 mentors. If there are
				less than 5 col size will adjust so they are not so tiny*/}
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Pancho</p>
					<p className="small-name">Pantera</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Henri</p>
					<p className="small-name">Poincare</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Ada</p>
					<p className="small-name">Lovelace</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Edgar Allan</p>
					<p className="small-name">Poe</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Eve</p>
					<p className="small-name">Moneypenny</p>
				</div>
				<div className="col s2 valign">
					<button onClick={console.log("arrow")}  className="btn-flat">
						<FaAngleRight className="profile-name"></FaAngleRight>
					</button>
				</div>
			</div>
		);
	}

	pull_mentees(){
		return(
			<div className="row valign-wrapper">
			{/*This will be the format used but profiles will be drawn
				dynamically from database and horizontal scroll will only
				happen if there are more than 5 mentees. If there are
				less than 5 col size will adjust so they are not so tiny*/}
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Leonard</p>
					<p className="small-name">Nemoy</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Hermione</p>
					<p className="small-name">Granger</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Xenia</p>
					<p className="small-name">Onatopp</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Ealinor</p>
					<p className="small-name">Rigby</p>
				</div>
				<div className="col s2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Spud</p>
					<p className="small-name">McKenzie</p>
				</div>
				<div className="col s2 valign">
					<button onClick={console.log("arrow")}  className="btn-flat">
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
					<a href="dummy1" className="collection-item black-text">
						How I decided I needed to plant my own garden
					</a>
					<a href="dummy2" className="collection-item black-text">
						Choosing the best socks for your interview
					</a>
					<a href="dummy3" className="collection-item black-text">
						How I came up with a human-size hamster-ball floating on water idea
					</a>
					<a href="dummy4" className="collection-item black-text">
						The time I opened my own restaurant
					</a>
				</div>
			</div>
		);
	}

	pull_collab(){
		return(
			<div></div>
		);
	}

	render(){
		return(
			<div>
				<div className="row fullrow"> <p> </p> </div>
				<div className="row fullrow">

					<div className="col s4">
						<img className="responsive-img circle" src={profile_pic}/>
						<p className="profile-name"> Jane Doe </p>
						<div className="container">
								{this.purpose_content()}
								{this.goals_content()}
								{this.accomplish_content()}
						</div>
					</div>

					<div className="col s8">
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<div className="col s4">
								<button className="btn-large waves-effect light-green valign-wrapper"> Become their Mentee </button>
							</div>
							<div className="col s4">
								<button className="btn-large waves-effect light-green"> Invite to Collaborate </button>
							</div>
							<div className="col s4">
								<button className="btn-large waves-effect light-green"> Folow their Activity </button>
							</div>
						</div>
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>

						<div className="row">
							<div className="col s10 push-s1">

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 profile-titles valign">Mentors</p>
										<p className="col s10 profile-text valign">These are people who have
										guided Jane towards her goals.</p>
									</div>
									{this.pull_mentors()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 profile-titles valign">Mentees</p>
										<p className="col s10 profile-text valign">These are people who have
										been supported by Jane to achieve their goals.</p>
									</div>
									{this.pull_mentees()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 profile-titles valign">Stories</p>
										<p className="col s10 profile-text valign">Learn more about how
										Jane got to where she is today.</p>
									</div>
									{this.pull_stories()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s3 profile-titles valign">Collaborations</p>
										<p className="col s9 profile-text valign">These are the projects
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
}

export default SEProfilePage;
