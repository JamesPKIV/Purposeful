import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import { Redirect, Link } from "react-router-dom";
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
			redirTo: "",
			userLogin: false,
		};
		this.handleUserLogin = this.handleUserLogin.bind(this);

		this.purposeful_Login = this.purposeful_Login.bind(this);
		this.purposeful_Signup = this.purposeful_Signup.bind(this);
		this.handleNameSet = this.handleNameSet.bind(this);
		this.handleEmailSet = this.handleEmailSet.bind(this);
		this.userPwdSet = this.userPwdSet.bind(this);

		this.handleContinue = this.handleContinue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKey = this.handleKey.bind(this);
	}


	// User sign up/login failed, handle reset
	handleReset(){
		this.props.handleEmailSet("");
		document.getElementById("email").value = "";
		document.getElementById("pwd").value = "";
	}

	// User pressed enter, continue
	handleKey(ev){
		console.log(this.state.userPwd);
		if(ev.key === "Enter"){
			this.handleEmailSet(ev);
			this.handleSubmit(ev);
		}
	}

	// User logging in helper method
	handleUserLogin (ev) {
		ev.preventDefault();
		this.setState({
			userLogin: !this.state.userLogin
		});
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

	handleContinue (ev) {
		if(this.props.userName===""){
			alert("Please enter a valid name");
		}else{
			ev.preventDefault();
			this.setState({
				nameSet: !this.state.nameSet,
			});
		}
	}

	handleSubmit(ev) {
		ev.preventDefault();
		const pwd = this.state.userPwd;
		this.setState({	userPwd: "" });

		if(!this.state.userLogin){
			this.props.handleCreateUser(pwd)
				.then((data) => {
					console.log("(LandingPage) user account created! new user data: ", data);
					/* programmatically navigate to interests & skills page, with state object */
					this.setState({ redirTo: "skills" });
				})
				.catch(err => {
					console.log("(LandingPage) user account creation failed with error: ", err);
					alert("Error creating new user account: " + err);
					this.handleReset();
				});
		} else {
			// fetch user profile from database
			this.props.handleLogin(pwd)
				.then((data) => {
					console.log("(Landing Page) User has logged! User data is: ", data);
					this.setState({	redirTo: "home" });
				})
				.catch(err => {
					console.log("(LandingPage) user account login failed with error: ", err);
					alert("Error logging user into app: " + err);
					this.handleReset();
				});
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
						<div className="col s12 m5 l5">
						<h5 className="div-login"> Sign up: </h5>
							<form onSubmit={this.handleContinue} >
								<div className="input-field col s12">
									<input
										type="text"
										placeholder="What is your name?"
										value={this.props.userName}
										onChange={this.handleNameSet}
										name="fullName" />
									<input className="btn light-green" type="submit"  value="Continue " />
								</div>
							</form>
							<div className="div-login">
								Have an account already?
								<Link onClick={this.handleUserLogin} to="/"  className="login-link"> Login</Link>
							</div>
						</div>
					</div>
				);
			} else if (this.state.nameSet) {
				return (
					<div className="col s12 m5 l5">
						<h5 className="div-login"> Sign Up: </h5>
						<form>
							<div className="row ">
								<div className="input-field col s12 m12 l12">
									<input placeholder="Email" id="email" onChange={this.handleEmailSet} type="text" name="Email" className="active validate " required />
								</div>
							</div>
							<div className="row ">
								<div className="input-field col s12 m12 l12">
									<input placeholder="Password" id="pwd" onChange={this.userPwdSet} onKeyPress={this.handleKey} className="active validate pwd" type="password" name="Password" required />
								</div><br />
							</div>
							<div className="row ">
								<div className="col s6 m4 l4 push-l1">
									<Link onClick={this.handleContinue} to="/">
										<div className="btn light-green darken-3">Back </div>
									</Link>
								</div>
								<div className="col s6 m4 l4 push-l2">
									<Link onClick={this.handleSubmit} to={{ pathname:"/interestskills" }}>
										<div className="btn light-green">Sign Up </div>
									</Link>
								</div>
							</div>
						</form>
						<div className="div-login">
							Have an account already?
							<Link onClick={this.handleUserLogin} to="/"  className="login-link"> Login</Link>
						</div>
					</div>
				);
			}
		}else{
			return (
				<div className="col s12 m5 l5">
					<h5 className="div-login"> Login: </h5>
					<form>
						<div className="row ">
							<div className="input-field col s12 m12 l12">
								<input placeholder="Email" id="email" onChange={this.handleEmailSet} type="text" name="Email" className="active validate" required />
							</div>
						</div>
						<div className="row ">
							<div className="input-field col s12 m12 l12">
								<input placeholder="Password" id="pwd" onChange={this.userPwdSet} onKeyPress={this.handleKey} className="active validate" type="password" name="Password" required />
							</div><br />
						</div>
						<div className="row">
							<div className="col s4 m4 l4 push-l4">
								<Link onClick={this.handleSubmit} to={{ pathname:"/home" }}>
									<div className="btn light-green">Login </div>
								</Link>
							</div>
						</div>
					</form>
					<div className="row">
						<div className="col s12 m12 l12">
							<h5 className="div-login">New to purposeful? <Link onClick={this.handleUserLogin} to="/"  className="login-link">
									Sign Up
								</Link>
							</h5>
						</div>
					</div>
				</div>
			);
		}
	}

	purposeful_Login(scr) {

		if(scr === "desktop"){
			return (
				<div className="col s12 m6 l6">
					<div className="row">
						<div className="col s12 m9 l9 push-l4">
							<button className="btn-large face-btn"> Continue with Facebook&nbsp;&nbsp;&nbsp;<FaFacebook className="s-icon" /></button>
						</div>
					</div>
					<div className="row">
						<div className="col s12 m9 l9 push-l4" >
						<button className="btn-large google-btn"> Continue with Google&nbsp;&nbsp;&nbsp;&nbsp;<FaGoogle className="s-icon" /></button>
						</div>
					</div>
					<div className="row ">
						<div className="col s12 m9 l9 push-l4" >
						<button className="btn-large link-btn"> Continue with Linkedin&nbsp;&nbsp;&nbsp;<FaLinkedin className="s-icon" /></button>
						</div>
					</div>
				</div>
			);
		} else {
			return(
				<span>
					<h5 className="row div-login"> Continue with: </h5>
					<div className="row welcome-title">
						<button className="col s2 push-s2 btn social-btn face-btn"><FaFacebook className="s-icon"/></button>
						<button className="col s2 push-s3 btn social-btn google-btn"><FaGoogle className="s-icon"/></button>
						<button className="col s2 push-s4 btn social-btn link-btn"><FaLinkedin className="s-icon"/></button>
					</div>
				</span>
			);
		}
	}

	render() {
		if (this.state.redirTo === "skills") {
			return (
				<Redirect to="/interestskills" />
			);
		}else if(this.state.redirTo === "home"){
			return(
				<Redirect to="/home" />
			);
		}

		var scr;
		if(window.innerWidth >= 700){
			scr = "desktop";
		} else {
			scr = "mobile";
		}

		return(
			<span >
				<div className="row fullrow">
					<img className="logo-class" src={logo} alt="logo"/>
					<h1 className="welcome-title">Welcome to Purposeful</h1>
				</div>
				<div className="row">
			  	{this.purposeful_Login(scr)}
					{this.purposeful_Signup()}
				</div>
			</span>
		);
	}
}

export default LandingPage;
