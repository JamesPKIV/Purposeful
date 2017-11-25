import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';
import NavBar from '../NavBar/NavBar';
import FaClose from 'react-icons/lib/fa/close';

class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			skills: ["skill1", "skill2", "skill3", "skill4"],
			interests: ["interst1", "interest2", "interest3"],
			here: false
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
						<div className="col s5 m3 l3 chip light-green lighten-4">
							{array[i]}<span className="close valign-wrapper"><FaClose
							           id={array[i]}
												 onClick={boundClick}
												 className="valign"/></span>
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
				interests: array,
				here: true
			});
		} else {
			this.setState({
				skills: array,
				here: true
			});
		}
	}

	add_skill_or_interest(new_tag, skill_bool){
		var array = [];
		if(skill_bool){
			array = this.state.skills;
			array.push(new_tag);
			this.setState({
				skills: array,
				here: true
			});
		} else {
			array = this.state.interests;
			array.push(new_tag);
			this.setState({
				interests: array,
				here: true
			});
		}
	}

	handleSubmit(new_categ){
		this.state.categories.push(new_categ);
		var new_array = this.state.categories;
		this.setState({
		  categories: new_array,
			here: true
		});
	}



  Desktop(){
    return(
			<span>
				<NavBar/>
			  <div className="container">
					<form className="col s12 m12 l12">

						<div className="card-panel">
							<div className="col s12 m12 l12">
								<h5 className="row">Personal Information:</h5>
							</div>
							<div className="row">
								<div className="input-field col s12 m6 l6 push-l3">
									<input placeholder="GET NAME FROM DATABASE" id="first_name" type="text" className="active validate"/>
									<label htmlFor="first_name" className="active">First Name *</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 m6 l6 push-l3">
									<input placeholder="GET LASTNAME IF ANY" id="last_name" type="text" className="validate active"/>
									<label htmlFor="last_name" className="active">Last Name (optional)</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 m6 l6 push-l3">
									<input placeholder="GET EMAIL FROM DATABASE" id="email_input" type="email" className="validate active"/>
									<label htmlFor="email_input" className="active">Email *</label>
								</div>
							</div>
							<div className="row">
								<Link to="/profile">
									<div className="btn light-green darken-3 col s4 m3 l3 push-l3">
										Back to profile
									</div>
								</Link>
								<button onClick={()=> this.handleSave("personal")} className="col s4 m3 l3 push-l4 push-s1 btn light-green">
									Save Personal Info
								</button>
							</div>
						</div>

						<div className="card-panel">
							<h5 className="row">Change Password:</h5>
							<div className="row">
								<div className="input-field col s12 m6 l6 push-l3">
									<input id="old_pw" type="password" className="validate active"/>
									<label htmlFor="old_pw" className="active">Type your current password *</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 m6 l6 push-l3">
									<input id="new_pw" type="password" className="validate active"/>
									<label htmlFor="new_pw" className="active">Type your new password *</label>
								</div>
							</div>
							<div className="row">
								<Link to="/profile">
									<div className="btn light-green darken-3 col s4 m3 l3 push-l3">
										Back to profile
									</div>
								</Link>
								<button onClick={()=> this.handleSave("password")} className="col s4 m3 l3 push-l4 push-s1 btn light-green">
									Save New Password
								</button>
							</div>
						</div>

						<div className="card-panel">
							<h5 className="row" id="editcateg">Edit Skills and Interests:</h5>
							<div className="row"> <p> </p> </div>
							<div className="row">
								<p className="col s1 m1 l1 push-l2 subtitle">Skills:</p>
								<div className="col s12 m8 l8 push-l2">
									<div className="row">
										{this.pull("skills")}
									</div>
									<div className="row">
										<div className="input-field col s12 m9 l9">
											<input id="new_skill" type="text"></input>
											<label className="active" htmlFor="new_skill">Insert a new skill</label>
										</div>
										<div className="col s2 m2 l2">
											<div onClick={() => this.add_skill_or_interest(document.getElementById("new_skill").value, true)} className="btn light-green">Add</div>
										</div>
									</div>
								</div>
							</div>
							<hr className="line"></hr>
							<div className="row">
								<p className="col s1 m1 l1 push-l2 subtitle">Interests:</p>
								<div className="col s12 m8 l8 push-l2">
									<div className="row">
										{this.pull("interests")}
									</div>
									<div className="row">
										<div className="input-field col s12 m9 l9">
											<input id="new_interest" type="text"></input>
											<label className="active" htmlFor="new_interest">Insert a new interest</label>
										</div>
										<div className="col s2 m2 l2">
											<div onClick={() => this.add_skill_or_interest(document.getElementById("new_interest").value, false)} className="btn light-green">Add</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row"> <p> </p> </div>
							<div className="row">
								<Link to="/profile">
									<div className="btn light-green darken-3 col s4 m3 l3 push-l3">
										Back to profile
									</div>
								</Link>
								<button onClick={()=> this.handleSave("interestSkills")} className="col s4 m3 l3 push-l4 push-s1 btn light-green">
									Save Skills and Intersts
								</button>
							</div>
						</div>
					</form>
				</div>
			</span>
    );
  }

  render() {
		if (!this.state.here){
			window.scrollTo(0,0);
		}
		return(
			this.Desktop()
		);
	}
}

export default EditProfile;
