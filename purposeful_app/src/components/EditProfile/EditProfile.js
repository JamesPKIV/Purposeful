import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";

class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			skills: ["skill1", "skill2", "skill3", "skill4"],
			interests: ["interst1", "interest2", "interest3"]
		};
		/*bind functions here*/
	}

/*
    -list of skills and interests used in search algorithm-- go to /interestskills*/

	handleSave(to_save){
		switch(to_save){
			case "personal":
				alert("Changes to personal info Saved! (NOT really, this is a dummy)");
				break;
			case "password":
				alert("Password authenticated and change saved! (NOT really, this is a dummy)");
				break;
			case "interestSkills":
				alert("Interests or skills saved! (NOT really, this is a dummy)");
				break;
			default:
				break;
		}
	}

	pull(to_pull){
		var i;
		let return_code = null;
		var array;
		if(to_pull === "interests"){
			array = this.state.interests;
		} else {
			array = this.state.skills;
		}
		var len = array.length;
		let boundClick = this.close.bind(this, to_pull);
		for(i = 0; i < len; i++){
			return_code =
					<span>
						{return_code}
						<div className="col s3 m3 l3 chip light-green lighten-4">
							{array[i]}<i id={array[i]} onClick={boundClick} className="close material-icons">close</i>
						</div>
					</span>
		}
		return(
			return_code
		);
	}

	close(which_array, e){
		var array = [];
		if(which_array === "interests"){
			array = this.state.interests;
		} else {
			array = this.state.skills;
		}
		var index = array.indexOf(e.currentTarget.id);
		if(index > -1){
			array.splice(index, 1);
		}
		if(which_array === "interests"){
			this.setState({
				interests: array
			});
		} else {
			this.setState({
				skills: array
			});
		}
	}

	add_skill_or_interest(new_tag, skill_bool){
		var array = [];
		if(skill_bool){
			array = this.state.skills;
			array.push(new_tag);
			this.setState({
				skills: array
			});
		} else {
			array = this.state.interests;
			array.push(new_tag);
			this.setState({
				interests: array
			});
		}
	}

	handleSubmit(new_categ){
		this.state.categories.push(new_categ);
		var new_array = this.state.categories;
		this.setState({
		  categories: new_array
		});
	}



  Desktop(){
    return(
		  <div className="container">
		 		<NavBar/>
				<form className="col s12 m12 l12 main-content card-panel">
					<h5 className="row">Edit Personal Information:</h5>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input placeholder="GET NAME FROM DATABASE" id="first_name" type="text" className="active validate"/>
							<label for="first_name" className="active">First Name *</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input placeholder="GET LASTNAME IF ANY" id="last_name" type="text" className="validate active"/>
							<label for="last_name" className="active">Last Name (optional)</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input placeholder="GET EMAIL FROM DATABASE" id="email_input" type="email" className="validate active"/>
							<label for="email_input" className="active">Email *</label>
						</div>
					</div>
					<div className="row">
						<button onClick={()=> this.handleSave("personal")} className="col s3 m3 l3 push-l6 btn light-green">
							Save Personal Info
						</button>
					</div>
					<hr className="line"></hr>
					<h5 className="row">Change Password:</h5>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input id="old_pw" type="password" className="validate active"/>
							<label for="old_pw" className="active">Type your current password *</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input id="new_pw" type="password" className="validate active"/>
							<label for="new_pw" className="active">Type your new password *</label>
						</div>
					</div>
					<div className="row">
						<button onClick={()=> this.handleSave("password")} className="col s3 m3 l3 push-l6 btn light-green">
							Save New Password
						</button>
					</div>
					<hr className="line"></hr>
					<h5 className="row">Edit Skills and Interests:</h5>
					<div className="row"> <p> </p> </div>
					<div className="row">
						<h6 className="col s1 m1 l1 push-l2">Skills:</h6>
						<div className="col s8 m8 l8 push-l2">
							<div className="row">
								{this.pull("skills")}
							</div>
							<div className="row">
								<div className="input-field col s9 m9 l9">
									<input id="new_skill" type="text"></input>
									<label className="active" for="new_skill">Insert a new skill</label>
								</div>
								<div className="col s2 m2 l2">
									<div onClick={() => this.add_skill_or_interest(document.getElementById("new_skill").value, true)} className="btn light-green">Add</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<h6 className="col s1 m1 l1 push-l2">Interests:</h6>
						<div className="col s8 m8 l8 push-l2">
							<div className="row">
								{this.pull("interests")}
							</div>
							<div className="row">
								<div className="input-field col s9 m9 l9">
									<input id="new_interest" type="text"></input>
									<label className="active" for="new_interest">Insert a new interest</label>
								</div>
								<div className="col s2 m2 l2">
									<div onClick={() => this.add_skill_or_interest(document.getElementById("new_interest").value, false)} className="btn light-green">Add</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row"> <p> </p> </div>
					<div className="row">
						<button onClick={()=> this.handleSave("interestSkills")} className="col s3 m3 l3 push-l6 btn light-green">
							Save Skills and Intersts
						</button>
					</div>
					<div className="cancel_btn fixed-action-btn btn-large light-green darken-3">
						<Link to="/profile">
							Back to profile
						</Link>
					</div>
				</form>
			</div>
    );
  }

  Mobile(){
    return(
      <span>
				<NavBar/>
				<div className="main-content">
					<img src={working} alt="working" width="100vw" className="row center"/>
					<p className="row"> For now this is not implemented, but edit your profile in a desktop!</p>
					<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
				</div>
			</span>
    );
  }

  render() {
		if(window.innerWidth > 700){
			return(
				this.Desktop()
			);
		} else {
			return(
				this.Mobile()
			);
		}
	}
}

export default EditProfile;
