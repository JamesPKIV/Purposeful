import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import { Link, Redirect } from "react-router-dom";
import FaFacebook from 'react-icons/lib/fa/facebook-square';
import FaLinkedin from 'react-icons/lib/fa/linkedin-square';
import FaGoogle from 'react-icons/lib/fa/google-plus-square';

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputInfo: false,
			nameSet: false,
			userPwd: "",
			redirTo: false,
			userLogin: false,
		};
		this.handleUserLogin = this.handleUserLogin.bind(this);

		this.purposeful_Login = this.purposeful_Login.bind(this);
		this.purposeful_Signup = this.purposeful_Signup.bind(this);
		this.purposeful_Login = this.purposeful_Login.bind(this);
		this.handleNameSet = this.handleNameSet.bind(this);
		this.handleEmailSet = this.handleEmailSet.bind(this);
		this.userPwdSet = this.userPwdSet.bind(this);

		this.handleContinue = this.handleContinue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// User logging in helper methods
	handleUserLogin (ev) { 
		this.setState({
			userLogin: !this.state.userLogin
		});
		console.log('user is logging in with his/her account');
	}


	// User signing up helper methods
	handleNameSet (ev) {
		var name = ev.target.value;
		this.props.handleNameSet(name);
	}

	handleEmailSet (ev) {
		var name = ev.target.value;
		this.props.handleEmailSet(name);
	}
	
	userPwdSet (ev) {
		this.setState({
			userPwd: ev.target.value,
		});
	}

	handleLogin (ev) {
		ev.preventDefault();
		const pwd = this.state.userPwd;
		this.setState({	userPwd: "" });

		this.props.handleLogin(pwd)
			.then((data) => {
				console.log("(LandingPage) user logged in! new user data: ", data);
				/* programmatically navigate to interests & skills page, with state object */
				this.setState({
					redirTo: "/home"
				});
			})
			.catch(err => {
				console.log("(LandingPage) user login failed with error: ", err);
				alert(err.message);
				this.setState({
					userPwd: "",
				});
			});
	}


	handleContinue (ev) {
		ev.preventDefault();
		this.setState({
			nameSet: !this.state.nameSet,
		});
	}

	handleSubmit(ev) {
		// If { // creates a new user }
		// Else {// user is attempting to login }
		if(!this.state.userLogin){
			ev.preventDefault();
			
					const pwd = this.state.userPwd;
					this.setState({	userPwd: "" });
			
					this.props.handleCreateUser(pwd)
						.then((data) => {
							console.log("(LandingPage) user account created! new user data: ", data);
							/* programmatically navigate to interests & skills page, with state object */
							this.setState({
								redirTo: "skills"
							});
						})
						.catch(err => {
							console.log("(LandingPage) user account creation failed with error: ", err);
							alert("Error creating new user account: " + err);
						});
		}else {
			ev.preventDefault();
			this.setState({	redirTo: "home"});	
			// fetch user profile from database
			console.log('user is trying to login');
		}
	}

	setShow(content_to_show) {
		this.setState({
			show: content_to_show
		});
	}

	purposeful_Signup () {
		if(!this.state.userLogin){
			if (!this.state.nameSet) {
				return (
					<div>
						<h5> Sign up </h5>
						<div className="col s6">
							<form onSubmit={this.handleContinue}>
								<div className="input-field col s12">
									<input
										type="text"
										placeholder="What is your name?"
										value={this.props.userName}
										onChange={this.handleNameSet}
										name="fullName" />
									<input className="btn light-green" type="submit" value="Continue " />
								</div>
							</form>
						</div>
					</div>
				);
			} else if (this.state.nameSet) {
				return (
					<div className="col s6">
						<form>
							<div className="row fullrow">
								<div className="input-field col s4">
									<input placeholder="Email" onChange={this.handleEmailSet} type="text" name="Email" className="active validate" required />
								</div>
							</div>
							<div className="row fullrow">
								<div className="input-field col s4">
									<input placeholder="Password" onChange={this.userPwdSet} className="active validate" type="password" name="Password" required />
								</div><br />
							</div>
							<div className="row fullrow">
								<div className="col s4">
									<Link onClick={this.handleSubmit} to={{ pathname:"/interestskills" }}>
										<div className="btn light-green">Sign Up </div>
									</Link>
								</div>
							</div>
						</form>
					</div>
				);
			}
		}else{
			return (
				<div className="col s6">
					<form>
						<div className="row fullrow">
							<div className="input-field col s4">
								<input placeholder="Email" onChange={this.handleEmailSet} type="text" name="Email" className="active validate" required />
							</div>
						</div>
						<div className="row fullrow">
							<div className="input-field col s4">
								<input placeholder="Password" onChange={this.userPwdSet} className="active validate" type="password" name="Password" required />
							</div><br />
						</div>
						<div className="row fullrow">
							<div className="col s4">
								<Link onClick={this.handleSubmit} to={{ pathname:"/home" }}>
									<div className="btn light-green">Login </div>
								</Link>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}

	purposeful_Login () {
		return (

			<div className="col s6 social-column">
				<div className="row fullrow">
					<div className="col s4 div-btn" >
					<button className="btn social-btn purpose-btn" onClick={this.handleUserLogin}> Login with Purposeful!</button>
					</div>
					<div className="row fullrow">
						<div className="input-field col s4 push-s4">
							<input 
								placeholder="Password" 
								onChange={this.userPwdSet} 
								value={this.state.userPwd}
								className="active validate" 
								type="password" 
								name="Password" 
								required 
							/>
						</div><br />
					</div>
					<div className="row fullrow">
						<div className="col s4 push-s4">
							<button 
								onClick={this.handleLogin} 
								className="btn light-green"
							> Log in 
							</button>
						</div>
					</div>
				</form>
				<div className="row fullrow">
					<div className="col s4 div-btn">
						<button className="btn social-btn face-btn"> Continue with Facebook&nbsp;&nbsp;&nbsp;<FaFacebook className="s-icon" /></button>
					</div>
				</div>
				<div className="row fullrow">
					<div className="col s4 div-btn" >
					<button className="btn social-btn google-btn"> Continue with Google&nbsp;&nbsp;&nbsp;&nbsp;<FaGoogle className="s-icon" /></button>
					</div>
				</div>
				<div className="row fullrow">
					<div className="col s4 div-btn" >
					<button className="btn social-btn link-btn"> Continue with Linkedin&nbsp;&nbsp;&nbsp;<FaLinkedin className="s-icon" /></button>
					</div>
				</div>
			</div>
		);
	}

	render() {
		if ( this.state.redirTo === "skills") {
			return (
				<Redirect to={this.state.redirTo} />
			);
		}else if(this.state.redirTo === "home"){
			return(
				<Redirect to="/home" />
			);
		}

			</div>
				<div className="row fullrow">
					<h1>Welcome to Purposeful</h1>
				</div>
				<div className="container">
					<div className="row">
					    {this.purposeful_Login()}
						{this.purposeful_Signup()}
					</div>
				</div>
			</div>
		);
	}
}

export default LandingPage;
