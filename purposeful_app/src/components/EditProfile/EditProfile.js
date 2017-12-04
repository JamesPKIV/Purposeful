import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';
import NavBar from '../NavBar/NavBar';
import FaClose from 'react-icons/lib/fa/close';
import Modal from 'react-modal';

//Style for modal messages!!
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			skills: ["skill1", "skill2", "skill3", "skill4"],
			interests: ["interst1", "interest2", "interest3"],
			here: false,
			modalIsOpen_personal1: false,
			modalIsOpen_personal2: false,
			modalIsOpen_pass1: false,
			modalIsOpen_pass2: false,
			modalIsOpen_intSk: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	toggleModal(to_toggle){
		switch(to_toggle){
			case "personal1":
				this.setState({
					modalIsOpen_personal1: !this.state.modalIsOpen_personal1
				});
				break;
			case "personal2":
				this.setState({
					modalIsOpen_personal2: !this.state.modalIsOpen_personal2
				});
				break;
			case "pass1":
				this.setState({
					modalIsOpen_pass1: !this.state.modalIsOpen_pass1
				});
				break;
			case "pass2":
				this.setState({
					modalIsOpen_pass2: !this.state.modalIsOpen_pass2
				});
				break;
			case "intSk":
				this.setState({
					modalIsOpen_intSk: !this.state.modalIsOpen_intSk
				});
				break;
			default:
				break;
		}
	}


	afterOpenModal(){
		// references are now sync'd and can be accessed.
	}

/*
    -list of skills and interests used in search algorithm-- go to /interestskills*/

	handleSave(e, to_save){
		e.preventDefault();
		var check1;
		var check2;
		switch(to_save){
			case "personal":
				check1 = document.getElementById("first_name").value;
				check2 = document.getElementById("email_input").value;
				if(check1 === "" || check2 === ""){
					this.toggleModal("personal1");
				} else {
					// CODE TO SAVE NEW INFO GOES HERE!

					this.toggleModal("personal2");
			  }
				break;
			case "password":
				check1 = document.getElementById("old_pw").value;
				check2 = document.getElementById("new_pw").value;
				if(check1 === "" || check2 === ""){
					this.toggleModal("pass1");
				} else {
					// CODE TO SAVE NEW PASSWORD GOES HERE

					this.toggleModal("pass2");
				}
				break;
			case "interestSkills":
				// CODE TO SAVE NEW INTERESTS AND SKILLS GOES HERE
				// WE MIGHT WANT TO CHECK IF THEY ACTUALLY DID ANY CHANGES...

				this.toggleModal("intSk");
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
		var closeclass = "";
		if(array.length > 3){
			closeclass =  "valign black-text";
		}else{
			closeclass = "valign no";
		}
		for(i = 0; i < len; i++){
			return_code =
					<span>
						{return_code}
						<div className="col s5 m3 l3 chip light-green lighten-4">
							{array[i]}<span className="close valign-wrapper"><FaClose
							           id={array[i]}
												 onClick={boundClick}
												 className={closeclass}/></span>
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
		if(array.length > 3){
			var index = array.indexOf(e.currentTarget.id);
			if(index > -1){
				array.splice(index, 1);
			}
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

	add_skill_or_interest(input_field, skill_bool){
		var new_tag = input_field.value;
		input_field.value = "";
		var array = [];
		if(new_tag !== ""){
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
	}

	handleSubmit(new_categ){
		this.state.categories.push(new_categ);
		var new_array = this.state.categories;
		this.setState({
		  categories: new_array,
			here: true
		});
	}

	componentWillMount(){
		Modal.setAppElement('body');
	}

  Desktop(){
    return(
			<span>
				<NavBar/>
			  <div className="container">
				<Modal
					isOpen={this.state.modalIsOpen_personal1}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={()=>this.toggleModal("personal1")}
					contentLabel="personal_modal1"
					style={customStyles}
				>
					<h5> Warning </h5>
					<p> Your information has NOT been saved. Please make sure all required fields have something in them </p>
					<div className="btn light-green" onClick={()=>this.toggleModal("personal1")}>Got It</div>
				</Modal>
				<Modal
					isOpen={this.state.modalIsOpen_personal2}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={()=>this.toggleModal("personal2")}
					contentLabel="personal_modal2"
					style={customStyles}
				>
					<h5> Success! </h5>
					<p> Your personal information has been updated successfully </p>
					<div className="btn light-green" onClick={()=>this.toggleModal("personal2")}>OK</div>
				</Modal>
				<Modal
					isOpen={this.state.modalIsOpen_pass1}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={()=>this.toggleModal("pass1")}
					contentLabel="password_modal1"
					style={customStyles}
				>
					<h5> Error </h5>
					<p> Please type your current password to change it </p>
					<div className="btn light-green" onClick={()=>this.toggleModal("pass1")}>Got It</div>
				</Modal>
				<Modal
					isOpen={this.state.modalIsOpen_pass2}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={()=>this.toggleModal("pass2")}
					contentLabel="password_modal2"
					style={customStyles}
				>
					<h5> Success! </h5>
					<p> Your new password has been saved successfully </p>
					<div className="btn light-green" onClick={()=>this.toggleModal("pass2")}>OK</div>
				</Modal>
				<Modal
					isOpen={this.state.modalIsOpen_intSk}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={()=>this.toggleModal("intSk")}
					contentLabel="intSk_modal"
					style={customStyles}
				>
					<h5> Success! </h5>
					<p> Your interests and skills have been updated successfully </p>
					<div className="btn light-green" onClick={()=>this.toggleModal("intSk")}>OK</div>
				</Modal>



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

								<button onClick={(e)=> {this.handleSave(e,"personal")}} className="col s4 m3 l3 push-l4 push-s1 btn light-green">
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
								<button onClick={(e)=> {this.handleSave(e,"password")}} className="col s4 m3 l3 push-l4 push-s1 btn light-green">
									Save New Password
								</button>
							</div>
						</div>

						<div className="card-panel">
							<h5 className="row" id="editcateg">Edit Skills and Interests:</h5>
							<div className="row"> <p> </p> </div>
							<div className="row">
								<p className="col s1 m1 l1 push-l1 subtitle">Skills:</p>
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
											<div onClick={() => this.add_skill_or_interest(document.getElementById("new_skill"), true)} className="btn light-green">Add</div>
										</div>
									</div>
								</div>
							</div>
							<hr className="line"></hr>
							<div className="row">
								<p className="col s1 m1 l1 push-l1 subtitle">Interests:</p>
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
											<div onClick={() => this.add_skill_or_interest(document.getElementById("new_interest"), false)} className="btn light-green">Add</div>
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
								<button onClick={(e)=> {this.handleSave(e, "interestSkills")}} className="col s4 m3 l3 push-l4 push-s1 btn light-green">
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
