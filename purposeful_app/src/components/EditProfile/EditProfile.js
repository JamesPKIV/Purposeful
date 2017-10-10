import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';
import working from "../App/still_working.png";

class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			/*add state variables here*/
		};
		/*bind functions here*/
	}

/*
    -list of skills and interests used in search algorithm-- go to /interestskills*/

  Desktop(){
    return(
      <div className="container">
				<form className="col s12 m12 l12">
					<h5 className="row">Edit Personal Information:</h5>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input placeholder="GET NAME FROM DATABASE" id="first_name" type="text" className="validate"/>
							<label for="first_name" className="active">First Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input placeholder="GET LASTNAME IF ANY" id="last_name" type="text" className="validate"/>
							<label for="last_name" className="active">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input placeholder="GET EMAIL FROM DATABASE" id="email_input" type="email" className="validate"/>
							<label for="email_input" className="active">Email</label>
						</div>
					</div>
					<div className="row"> <p> </p> </div>
					<div className="row"> <p> </p> </div>
					<h5 className="row">Change Password:</h5>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input id="old_pw" type="password" className="validate"/>
							<label for="old_pw" className="active">Type your current password</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6 m6 l6 push-l3">
							<input id="new_pw" type="password" className="validate"/>
							<label for="new_pw" className="active">Type your new password</label>
						</div>
					</div>
					<div className="row"> <p> </p> </div>
					<div className="row"> <p> </p> </div>
					<h5 className="row">Edit Skills and Interests:</h5>
					<div className="row">
						<h6 className="col s1 m1 l1 push-l2">Skills:</h6>
						<div className="col s2 m2 l2 push-l2 chip">
							SomeSkill1 <i className="close material-icons">close</i>
						</div>
						<div className="col s2 m2 l2 push-l2 chip">
							SomeSkill2 <i className="close material-icons">close</i>
						</div>
						<div className="col s2 m2 l2 push-l2 chip">
							SomeSkill3 <i className="close material-icons">close</i>
						</div>
					</div>
					<div className="row">
						<h6 className="col s1 m1 l1 push-l2">Interests:</h6>
						<div className="col s2 m2 l2 push-l2 chip">
							SomeInterest1 <i className="close material-icons">close</i>
						</div>
						<div className="col s2 m2 l2 push-l2 chip">
							SomeInterestl2 <i className="close material-icons">close</i>
						</div>
						<div className="col s2 m2 l2 chip push-l2">
							SomeInterest3 <i className="close material-icons">close</i>
						</div>
					</div>
					<div className="row"> <p> </p> </div>
					<div className="row"> <p> </p> </div>
					<div className="row"> <p> </p> </div>
					<div className="row">
						<div className="col s2 m2 l2 push-l6 btn-large light-green">
							Save Changes
						</div>
						<div className="col s2 m2 l2 push-l7 btn-large light-green darken-3">
							Cancel
						</div>
					</div>
				</form>
			</div>
    );
  }

  Mobile(){
    return(
      <span>
				<img src={working} alt="working" width="100vw" className="row center"/>
				<p className="row"> For now this is not implemented, but edit your profile in a desktop!</p>
				<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
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
