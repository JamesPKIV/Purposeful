import React, { Component } from 'react';
import './ProfilePage.css';
import profile_pic from '../SEProfilePage/profile-pic-default.jpg';
import project_pic from '../SEProfilePage/project-pic-default.jpg';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
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

		this.state = {
			name: "",
			uid: "",
			isLoggedIn : false,
			purposeDisplay : false,
			goalsDisplay : false,
			accomplishDisplay: false,
			purposeEdit: false,
			goalsEdit: false,
			accomplishEdit: false,
			changePicture: false
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
			case "purposeEdit":
				this.setState({
					purposeEdit: !this.state.purposeEdit
				});
				break;
			case "goalsEdit":
				this.setState({
					goalsEdit: !this.state.goalsEdit
				});
				break;
			case "accomplishEdit":
				this.setState({
					accomplishEdit: !this.state.accomplishEdit
				});
				break;
			case "changePicture":
				this.setState({
					changePicture: !this.state.changePicture
				});
				break;
			default:
				break;
		}
	}

	loadLoggedIn(){
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

	loadLoggedOut(){
		return(
			<div>
			<p> you are NOT logged in, and this is your profile page. Dummy button to log in:</p>
			<button onClick={() => this.toggle("isLoggedIn")}> LOGIN </button>
			</div>
		);
	}

	edit_or_save(to_toggle, button_or_text){
		var toggle_state;
		var text;
		var display_string;
		switch(to_toggle){
			case "purposeEdit":
				toggle_state = this.state.purposeEdit;
				display_string = "purposeDisplay";
				text = "Write in this space current personal, inter-personal, professional, or organizational projects you are working on. Try to explain why these projects make you excited, and the ways they relate to your experience, skills, and interests.";
				break;
			case "goalsEdit":
				toggle_state = this.state.goalsEdit;
				display_string = "goalsDisplay";
				text = "Write in this space anything that you wish to do in the future. They can be ready-to-start ideas, half-baked ideas, long-term goals, personal goals, new-year resolutions, crazy dreams, or anything you wish you knew more about!";
				break;
			case "accomplishEdit":
				toggle_state = this.state.accomplishEdit;
				display_string = "accomplishDisplay";
				text = "Write in this space anything that you feel proud you have accomplished. It could include your academic achievements, personal challenges that you have defeated, places you have traveled to, hobbies you have learned, or anything else you can think about!";
				break;
			default:
				break;
		}
		if(toggle_state){
			if(button_or_text === "button"){
				return(
					<button onClick={() => this.toggle(to_toggle)} className="btn-flat profile-text right">
						Save <FaFloppyO className="profile-text"></FaFloppyO>
					</button>
				);
			} else {
				return(
					<div className="input-field">
						<input value={text} type="text" className="active"></input>
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
				return(
					<p className="profile-text valign">{text}</p>
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
						{this.edit_or_save("purposeEdit", "text")}
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
					<p className="profile-titles">
						Will do
						<button onClick={() =>this.toggle("goalsDisplay")} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
						{this.edit_or_save("goalsEdit", "button")}
					</p>
					{this.edit_or_save("goalsEdit", "text")}
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
						{this.edit_or_save("accomplishEdit", "button")}
					</p>
					{this.edit_or_save("accomplishEdit", "text")}
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
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Pancho</p>
					<p className="small-name">Pantera</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Henri</p>
					<p className="small-name">Poincare</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Ada</p>
					<p className="small-name">Lovelace</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Edgar Allan</p>
					<p className="small-name">Poe</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Eve</p>
					<p className="small-name">Moneypenny</p>
				</div>
				<div className="col s2 m2 l2valign">
					<button className="btn-flat">
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
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Leonard</p>
					<p className="small-name">Nemoy</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Hermione</p>
					<p className="small-name">Granger</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Xenia</p>
					<p className="small-name">Onatopp</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Ealinor</p>
					<p className="small-name">Rigby</p>
				</div>
				<div className="col s2 m2 l2">
					<img className="responsive-img circle" src={profile_pic}/>
					<p className="small-name">Spud</p>
					<p className="small-name">McKenzie</p>
				</div>
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
					<a href="dummy1" className="collection-item green-text">
						How I decided I needed to plant my own garden
					</a>
					<a href="dummy2" className="collection-item green-text">
						Choosing the best socks for your interview
					</a>
					<a href="dummy3" className="collection-item green-text">
						How I came up with a human-size hamster-ball floating on water idea
					</a>
					<a href="dummy4" className="collection-item green-text">
						The time I opened my own restaurant
					</a>
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
							<img src={project_pic}/>
						</div>
						<div className="card-content collabCard-text">
							Thinking Sofas: We strive to build sofas that help you reach
							those wonderful philosophical ideas.
						</div>
						<div className="card-action light-green">
							<a href="#" className="white-text">Learn More</a>
						</div>
					</div>
				</div>


				<div className="col s4 m4 l4">
					<div className="card ">
						<div className="card-image">
							<img src={project_pic}/>
						</div>
						<div className="card-content collabCard-text">
							We created a community garden at our neighborhood, we can help
							you start on at your neighborhood too!
						</div>
						<div className="card-action light-green">
							<a href="#" className="white-text">Learn More</a>
						</div>
					</div>
				</div>

				<div className="col s4 m4 l4">
					<div className="card">
						<div className="card-image">
							<img src={project_pic}/>
						</div>
						<div className="card-content collabCard-text">
							Annyone who wants to quit smoking, we can do it together!
						</div>
						<div className="card-action light-green">
							<a href="#" className="white-text">Learn More</a>
						</div>
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
						<div className="btn waves-effect light-green col s6 m6 l6 push-l3">
							<span>Browse For a New Picture</span> <input type="file"></input>
						</div>
					</div>
					<div className="row">
						<button onClick={() => this.toggle("changePicture")} className="col s2 m2 l2 push-l8 btn waves-effect light-green darken-3">
							Cancel
						</button>
					</div>
				</div>
			);
		} else {
			return(
				<div className="row">
					<button onClick={() => this.toggle("changePicture")} className="btn waves-effect light-green"> Edit your profile picture  <FaCamera> </FaCamera> </button>
				</div>
			);
		}
	}

	editAccount(){
		console.log("edit");
	/*	return(
			<div id="myModal" className="modal">
  			<div className="modal-content">
    			<span className="close">&times;</span>
    			<p>Some text in the Modal..</p>
  			</div>
			</div>
		);*/
	}

	displayDesktop(){
		return(
			<div>
				<div className="row fullrow"> <p> </p> </div>
				<div className="row fullrow">

					<div className="col s4 m4 l4">
						<div className="row">
							<img className="responsive-img circle" src={profile_pic}/>
							<p className="profile-name"> Your Name </p>
						</div>
						{this.change_picture()}
						<div className="row">
							<button className="btn waves-effect light-green" onClick={this.editAccount()}>
								Edit your account information  <FaPencil> </FaPencil>
							</button>
						</div>

						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<div className="container">
									{this.purpose_content()}
									{this.goals_content()}
									{this.accomplish_content()}
							</div>
						</div>
					</div>

					<div className="col s8 m8 l8">
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<div className="col s10 m10 l10 push-l1">

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 m2 l2 profile-titles valign">Mentors</p>
										<div className="col s5 m5 l5 push-l1">
											<button className="btn waves-effect light-green"> Manage your current mentors  <FaGroup> </FaGroup> </button>
										</div>
										<div className="col s5 m5 l5">
											<button className="btn waves-effect light-green"> Find a mentor!  <FaMagic> </FaMagic> </button>
										</div>
									</div>
									{this.pull_mentors()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 m2 l2 profile-titles valign">Mentees</p>
										<div className="col s5 m5 l5 push-l1">
											<button className="btn waves-effect light-green"> Manage your current mentees  <FaGroup> </FaGroup> </button>
										</div>
										<div className="col s5 m5 l5">
											<button className="btn waves-effect light-green"> Find a mentee!  <FaMagic> </FaMagic> </button>
										</div>
									</div>
									{this.pull_mentees()}
								</div>

								<div className="card-panel">
									<div className="row valign-wrapper">
										<p className="col s2 m2 l2 profile-titles valign">Stories</p>
										<div className="col s4 m4 l4">
											<button className="btn waves-effect light-green"> Manage your stories  <FaPencil> </FaPencil> </button>
										</div>
										<div className="col s5 m5 l5">
											<button className="btn waves-effect light-green"> Write a new story or article!  <FaPencil> </FaPencil> </button>
										</div>
									</div>
									{this.pull_stories()}
								</div>
								<div className="card-panel">
									<div className="row">
										<div className= "col s4 m4 l4">
											<p className="row profile-titles">Collaborations</p>
											<div className="row">
												<button className="btn waves-effect light-green"> Manage your collabs  <FaGroup> </FaGroup> </button>
											</div>
											<div className="row">
												<button className="btn waves-effect light-green"> Find collab!  <FaMagic> </FaMagic> </button>
											</div>
											<div className="row">
												<button className="btn waves-effect light-green"> Start a collab!  <FaLightbulbO> </FaLightbulbO> </button>
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
						<img className="responsive-img circle" src={profile_pic}/>
					</div>
					<div className="col s7 m7 l7 ">
						<div className="row">
							<button className="btn waves-effect light-green"> Edit account<FaPencil></FaPencil></button>
						</div>
						<div className="row">
							<button className="btn waves-effect light-green"> Edit picture<FaCamera></FaCamera> </button>
						</div>
					</div>
				</div>
				<div className="row fullrow">
					<p className="profile-name"> Your Name </p>
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
						</div>
						<div className="row">
							<div className="col s6 m6 l6">
								<button className="btn waves-effect light-green">Manage<FaGroup></FaGroup> </button>
							</div>
							<div className="col s6 m6 l6">
								<button className="btn waves-effect light-green">Find<FaMagic></FaMagic> </button>
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
								<button className="btn waves-effect light-green">Manage<FaGroup></FaGroup> </button>
							</div>
							<div className="col s6 m6 l6">
								<button className="btn waves-effect light-green">Find<FaMagic></FaMagic> </button>
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
								<button className="btn waves-effect light-green">Manage<FaPencil></FaPencil> </button>
							</div>
							<div className="col s6 m6 l6">
								<button className="btn waves-effect light-green">Write<FaPencil></FaPencil> </button>
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
								<button className="btn waves-effect light-green">Manage<FaGroup></FaGroup> </button>
							</div>
							<div className="col s4 m4 l4">
								<button className="btn waves-effect light-green">Find<FaMagic></FaMagic> </button>
							</div>
							<div className="col s4 m4 l4">
								<button className="btn waves-effect light-green">Start<FaLightbulbO></FaLightbulbO> </button>
							</div>
						</div>
						{this.pull_collab()}
					</div>
				</div>
			</div>
		);
	}



	render () {
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<article className="profile-content">
				{
					this.state.isLoggedIn ?
			        <p> you are logged in {this.state.name}, id#{this.state.uid}, and this is your profile page. </p>
                    :
                    <p> you are NOT logged in, and this is your profile page. </p>
			    }
			</article>
        );

			this.state.isLoggedIn ?
				this.loadLoggedIn() :/* desktop version */
				this.loadLoggedOut();  /*mobile version */
	}
}

export default ProfilePage;
