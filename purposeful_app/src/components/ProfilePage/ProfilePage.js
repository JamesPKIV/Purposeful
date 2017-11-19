import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import './ProfilePage.css';
import NavBar from '../NavBar/NavBar';

import profile_pic from '../SEProfilePage/profile-pic-default.jpg';
import project_pic from '../SEProfilePage/project-pic-default.jpg';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaCamera from 'react-icons/lib/fa/camera';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaGroup from 'react-icons/lib/fa/group';
import FaMagic from 'react-icons/lib/fa/magic';
import FaLightbulbO from 'react-icons/lib/fa/lightbulb-o';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';

class ProfilePage extends Component {

	constructor (props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.loadLoggedIn = this.loadLoggedIn.bind(this);
		this.loadLoggedOut= this.loadLoggedOut.bind(this);

		this.purpose_content = this.purpose_content.bind(this);
		this.goals_content = this.goals_content.bind(this);
		this.accomplish_content = this.accomplish_content.bind(this);
		this.edit_or_save = this.edit_or_save.bind(this);

		this.pull_mentors = this.pull_mentors.bind(this);
		this.pull_mentees = this.pull_mentees.bind(this);
		this.pull_stories = this.pull_stories.bind(this);
		this.pull_collab = this.pull_collab.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmitChange = this.handleSubmitChange.bind(this);

		this.state = {
			userName: "",
			userId: "",
			isLoggedin : false,
			purposeDisplay : false,
			goalsDisplay : false,
			accomplishDisplay: false,
			purposeEdit: false,
			goalsEdit: false,
			accomplishEdit: false,
			changePicture: false,
			here: false,
			skills: ["skill1", "skill2", "skill3", "skill4"],
			interests: ["interest1", "interest2", "interest3", "interest4", "interest5"]
		};
	}

	handleSubmitChange(to_toggle) {
		this.props.handleSubmitChange();
		this.toggle(to_toggle);
	}

	handleInputChange (updateFn, event) {
		var input = event.target.value;
		updateFn(input);
  }

	componentDidMount () {
		this.props.fetchData();
	}

	toggle(to_toggle){
		switch(to_toggle){
			case "purposeDisplay":
				this.setState({
					purposeDisplay: !this.state.purposeDisplay,
					here: true
				});
				break;
			case "goalsDisplay":
				this.setState({
					goalsDisplay: !this.state.goalsDisplay,
					here: true
				});
				break;
			case "accomplishDisplay":
				this.setState({
					accomplishDisplay: !this.state.accomplishDisplay,
					here: true
				});
				break;
			case "purposeEdit":
				this.setState({
					purposeEdit: !this.state.purposeEdit,
					here: true
				});
				break;
			case "goalsEdit":
				this.setState({
					goalsEdit: !this.state.goalsEdit,
					here: true
				});
				break;
			case "accomplishEdit":
				this.setState({
					accomplishEdit: !this.state.accomplishEdit,
					here: true
				});
				break;
			case "changePicture":
				this.setState({
					changePicture: !this.state.changePicture,
					here: true
				});
				break;
			default:
				break;
		}
	}

	loadLoggedIn(){
		if(window.innerWidth >= 700){
			return(
				this.displayDesktop()
			);
		} else {
			return(
				this.displayMobile()
			);
		}
	}

	loadLoggedOut(){
		return(
			<Redirect to="/landing" />
		);
	}

	edit_or_save(to_toggle, button_or_text, truncate){
		var toggle_state;
		var text;
		var value;
		var onEdit;
		switch(to_toggle){
			case "purposeEdit":
				toggle_state = this.state.purposeEdit;
				text = "[Write in this space current personal, inter-personal, professional, or organizational projects you are working on. Try to explain why these projects make you excited, and the ways they relate to your experience, skills, and interests.]";
				value = this.props.present;
				onEdit = this.props.handleChangePresent;
				break;
			case "goalsEdit":
				toggle_state = this.state.goalsEdit;
				text = "[Write in this space anything that you wish to do in the future. They can be ready-to-start ideas, half-baked ideas, long-term goals, personal goals, new-year resolutions, crazy dreams, or anything you wish you knew more about!]";
				value = this.props.future;
				onEdit = this.props.handleChangeFuture;
				break;
			case "accomplishEdit":
				toggle_state = this.state.accomplishEdit;
				text = "[Write in this space anything that you feel proud you have accomplished. It could include your academic achievements, personal challenges that you have defeated, places you have traveled to, hobbies you have learned, or anything else you can think about!]";
				value = this.props.past;
				onEdit = this.props.handleChangePast;
				break;
			default:
				break;
		}
		if(toggle_state){
			if(button_or_text === "button"){
				return(
					<button onClick={() => this.handleSubmitChange(to_toggle) } className="btn-flat profile-text right">
						Save <FaFloppyO className="profile-text"></FaFloppyO>
					</button>
				);
			} else {
				return(
					<div className="input-field">
						<textarea
							defaultValue={value}
							placeholder={text}
							onChange={ ev => this.handleInputChange(onEdit, ev) }
							editable="true"
							rows={6}
							className="active textarea-class profile-text">
						</textarea>
					</div>
				);
			}
		} else {
			if(button_or_text === "button"){
				return(
					<button onClick={() => this.toggle(to_toggle)} className="btn-flat profile-text right">
						Edit <FaPencil className="profile-text"></FaPencil>
					</button>
				);
			} else {
				var style;
				if(truncate){
					if(value === null){
						style = "profile-text valign truncate placeholder";
					} else {
						style = "profile-text valign truncate";
					}
				} else {
					if(value === null){
						style = "profile-text valign placeholder";
					} else {
						style = "profile-text valign";
					}
				}
				console.log("value is: "+value);
				return(
					<p className={style}>{(value !== null) ? value : text}</p>
				);
			}
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
							{this.edit_or_save("purposeEdit","button")}
						</p>
						{this.edit_or_save("purposeEdit", "text", false)}
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
							{this.edit_or_save("purposeEdit", "button")}
						</p>
						{this.edit_or_save("purposeEdit", "text", true)}


					</div>
				);
			}
	}

	goals_content(){
		if(this.state.goalsDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles">
						Will do
						<button onClick={() =>this.toggle("goalsDisplay")} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
						{this.edit_or_save("goalsEdit", "button")}
					</p>
					{this.edit_or_save("goalsEdit", "text", false)}
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
						{this.edit_or_save("goalsEdit", "button")}
					</p>
					{this.edit_or_save("goalsEdit", "text", true)}
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
						{this.edit_or_save("accomplishEdit", "button")}
					</p>
					{this.edit_or_save("accomplishEdit", "text", false)}
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
						{this.edit_or_save("accomplishEdit", "button")}
					</p>
					{this.edit_or_save("accomplishEdit", "text", true)}
				</div>
			);
		}
	}

	pull_mentors(){
		return(
			<div className="row valign-wrapper">
				<ActivityFeed linkTo="/SEProfile" />
			</div>
		);
	}

	pull_mentees(){
		return(
			<div className="row valign-wrapper">
				<ActivityFeed linkTo="/SEProfile" />
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
			<div className="col s8 m8 l8">

				<div className="col s4 m4 l4">
					<div className="card">
						<div className="card-image">
							<img src={project_pic} alt=""/>
						</div>
						<div className="card-content collabCard-text">
							Thinking Sofas: We strive to build sofas that help you reach
							those wonderful philosophical ideas.
						</div>
						<Link to="/collabs" className="white-text">
							<div className="card-action light-green">
								MANAGE
							</div>
						</Link>
					</div>
				</div>


				<div className="col s4 m4 l4">
					<div className="card ">
						<div className="card-image">
							<img src={project_pic} alt=""/>
						</div>
						<div className="card-content collabCard-text">
							We created a community garden at our neighborhood, we can help
							you start on at your neighborhood too!
						</div>
						<Link to="/collabs" className="white-text">
							<div className="card-action light-green">
								MANAGE
							</div>
						</Link>
					</div>
				</div>

				<div className="col s4 m4 l4">
					<div className="card">
						<div className="card-image">
							<img src={project_pic} alt=""/>
						</div>
						<div className="card-content collabCard-text">
							Annyone who wants to quit smoking, we can do it together!
						</div>
						<Link to="/collabs" className="white-text">
							<div className="card-action light-green">
								MANAGE
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	change_picture(){
		if(this.state.changePicture){
			return(
				<div className="row">
					<div className="file-field input-field row">
						<div className="btn waves-effect light-green col s12 m6 l6 push-l3">
							<span>Browse For Picture</span> <input type="file"></input>
						</div>
					</div>
					<div className="row">
						<button onClick={() => this.toggle("changePicture")} className="col s12 m2 l2 push-l8 btn waves-effect light-green darken-3">
							Cancel
						</button>
					</div>
				</div>
			);
		} else {
			return(
				<div className="row">
					<button onClick={() => this.toggle("changePicture")} className="btn waves-effect light-green">Change picture <FaCamera></FaCamera></button>
				</div>
			);
		}
	}

	pull(to_pull){
		var array = [];
		if(to_pull === "skills"){
			array = this.state.skills;
		} else {
			array = this.state.interests;
		}
		var i;
		let return_code = null;
		for (i = 0; i < array.length; i++){
			return_code =
				<span>
					{return_code}
					<div className="col s2 m2 l2 chip light-green lighten-4">{array[i]}</div>
				</span>
		}
		return (
			<span>
				{return_code}
			</span>
		);
	}

	displayDesktop(){
		return(
			<div className=" main-content">
				<div className="row">
					<div className="col s12 m12 l12">
						<div className="col s4 m4 l4">
							<div className="row">
								<img className="responsive-img circle" src={profile_pic} alt=""/>
								<p className="profile-name"> {this.props.userName} </p>
							</div>
							{this.change_picture()}
							<div className="row">
								<Link to="/editProfile" className="btn waves-effect light-green">
									Edit your account information  <FaPencil> </FaPencil>
								</Link>
							</div>

							<div className="row"> <p> </p> </div>
							<div className="row"> <p> </p> </div>
							<div className="row"> <p> </p> </div>
							<div className="row">
								<div className="container left-content" >
										{this.purpose_content()}
										{this.goals_content()}
										{this.accomplish_content()}
								</div>
							</div>
							<div className="row"> <p> </p> </div>
							<div className="row">
								<div className="container left-content">
									<div className="card-panel">
										<div className="row">
											<Link to="/editProfile#editcateg" className="btn-flat profile-text right">
												Edit <FaPencil className="profile-text"></FaPencil>
											</Link>
										</div>
										<hr className="col s12 m12 l12"></hr>
										<div className="row"> <p> </p> </div>
										<div className="row">
											<p className="profile-titles"> Your Skills </p>
											{this.pull("skills")}
										</div>
										<hr className="col s12 m12 l12"></hr>
										<div className="row"> <p> </p> </div>
										<div className="row">
											<p className="profile-titles"> Your Interests </p>
											{this.pull("interests")}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col s8 m8 l8">
							<div className="row"> <p> </p> </div>
							<div className="row"> <p> </p> </div>
							<div className="row">
									<div className="card-panel">
										<div className="row valign-wrapper">
											<p className="col s2 m2 l2 profile-titles valign">Mentors</p>
											<div className="col s5 m5 l5 push-l1">
												<Link to="/mentorship" className="btn waves-effect light-green">
													Manage your current mentors  <FaGroup> </FaGroup>
												</Link>
											</div>
											<div className="col s5 m5 l5">
												<Link to="/mentorship" className="btn waves-effect light-green">
													Find a mentor!  <FaMagic> </FaMagic>
												</Link>
											</div>
										</div>
										{this.pull_mentors()}
									</div>

									<div className="card-panel">
										<div className="row valign-wrapper">
											<p className="col s2 m2 l2 profile-titles valign">Mentees</p>
											<div className="col s5 m5 l5 push-l1">
												<Link to="/mentorship" className="btn waves-effect light-green">
													Manage your current mentees  <FaGroup> </FaGroup>
												</Link>
											</div>
											<div className="col s5 m5 l5">
												<Link to="/mentorship" className="btn waves-effect light-green">
													Find a mentee!  <FaMagic> </FaMagic>
												</Link>
											</div>
										</div>
										{this.pull_mentees()}
									</div>

									<div className="card-panel">
										<div className="row valign-wrapper">
											<p className="col s2 m2 l2 profile-titles valign">Stories</p>
											<div className="col s4 m4 l4">
												<Link to="/managestories" className="btn waves-effect light-green">
													Manage your stories  <FaPencil> </FaPencil>
												</Link>
											</div>
											<div className="col s5 m5 l5">
												<Link to="/newstories" className="btn waves-effect light-green">
													Write a new story or article!  <FaPencil> </FaPencil>
												</Link>
											</div>
										</div>
										{this.pull_stories()}
									</div>
									<div className="card-panel">
										<div className="row">
											<div className= "col s4 m4 l4">
												<p className="row profile-titles">Collaborations</p>
												<div className="row">
													<Link to="/collabs" className="btn waves-effect light-green">
														Manage your collabs  <FaGroup> </FaGroup>
													</Link>
												</div>
												<div className="row">
													<Link to="/collabs" className="btn waves-effect light-green">
														Find collab!  <FaMagic> </FaMagic>
													</Link>
												</div>
												<div className="row">
													<Link to="/collabs" className="btn waves-effect light-green">
														Start a collab!  <FaLightbulbO> </FaLightbulbO>
													</Link>
												</div>
											</div>
											{this.pull_collab()}
										</div>
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
				<div className="row fullrow"> <p> </p></div>
				<div className="row fullrow">
					<div className="col s5 m5 l5">
						<img className="responsive-img circle" src={profile_pic} alt="profile_pic"/>
					</div>
					<div className="col s7 m7 l7 ">
						<div className="row">
							<Link to="/editProfile" className="btn waves-effect light-green">
								Edit account<FaPencil></FaPencil>
							</Link>
						</div>
						{this.change_picture()}
					</div>
				</div>
				<div className="row fullrow">
					<p className="profile-name"> {this.props.userName} </p>
				</div>
				<div className="row fullrow">
					{this.purpose_content()}
					{this.goals_content()}
					{this.accomplish_content()}
				</div>
				<div className="row fullrow">
					<div className="card-panel">
						<div className="row">
							<Link to="/editProfile" className="btn-flat profile-text right">
								Edit <FaPencil className="profile-text"></FaPencil>
							</Link>
						</div>
						<hr className="col s12 m12 l12"></hr>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<p className="profile-titles"> Your Skills </p>
							{this.pull("skills")}
						</div>
						<hr className="col s12 m12 l12"></hr>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<p className="profile-titles"> Your Interests </p>
							{this.pull("interests")}
						</div>
					</div>
				</div>
				<div className="row fullrow">
					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Mentors</p>
						</div>
						<div className="row">
							<div className="col s6 m6 l6">
								<Link to="/mentorship" className="btn waves-effect light-green">
									Manage<FaGroup></FaGroup>
								</Link>
							</div>
							<div className="col s6 m6 l6">
								<Link to="/mentorship" className="btn waves-effect light-green">
									Find<FaMagic></FaMagic>
								</Link>
							</div>
						</div>
						{this.pull_mentors()}
					</div>

					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Mentees</p>
						</div>
						<div className="row">
							<div className="col s6 m6 l6">
								<Link to="/mentorship" className="btn waves-effect light-green">
									Manage<FaGroup></FaGroup>
								</Link>
							</div>
							<div className="col s6 m6 l6">
								<Link to="/mentorship" className="btn waves-effect light-green">
									Find<FaMagic></FaMagic>
								</Link>
							</div>
						</div>
						{this.pull_mentees()}
					</div>

					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Stories</p>
						</div>
						<div className="row">
							<div className="col s6 m6 l6">
								<Link to="/managestories" className="btn waves-effect light-green">
									Manage<FaPencil></FaPencil>
								</Link>
							</div>
							<div className="col s6 m6 l6">
								<Link to="/newstories" className="btn waves-effect light-green">
									Write<FaPencil></FaPencil>
								</Link>
							</div>
						</div>
						{this.pull_stories()}
					</div>

					<div className="card-panel">
						<div className="row">
							<p className="profile-titles">Collaborations</p>
						</div>
						<div className="row">
							<div className="col s4 m4 l4">
								<Link to="/collabs" className="btn waves-effect light-green">
									Manage<FaGroup></FaGroup>
								</Link>
							</div>
							<div className="col s4 m4 l4">
								<Link to="/collabs" className="btn waves-effect light-green">
									Find<FaMagic></FaMagic>
								</Link>
							</div>
							<div className="col s4 m4 l4">
								<Link to="/collabs" className="btn waves-effect light-green">
									Start<FaLightbulbO></FaLightbulbO>
								</Link>
							</div>
						</div>
						{this.pull_collab()}
					</div>
				</div>
			</div>
		);
	}



	render () {
		console.log("=====HERE!!!:" + this.state.here);
		if(!this.state.here){

			window.scrollTo(0,0);
		}
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<span>
				<NavBar/>
				{this.props.isLoggedIn ?
				this.loadLoggedIn() :/* User is logged in*/
				this.loadLoggedOut() /* User happens to be logged out */}
			</span>
    );
	}
}

export default withRouter(ProfilePage);
