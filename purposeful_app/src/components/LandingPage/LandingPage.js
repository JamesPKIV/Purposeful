import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import { Redirect } from "react-router-dom";
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
			show: "signup",
		};
		this.handleContinue = this.handleContinue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.purposeful_Signup = this.purposeful_Signup.bind(this);
		this.purposeful_Login = this.purposeful_Login.bind(this);
		this.handleNameSet = this.handleNameSet.bind(this);
		this.handleEmailSet = this.handleEmailSet.bind(this);
		this.userPwdSet = this.userPwdSet.bind(this);
		this.setShow = this.setShow.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}


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
		if(this.state.userPwd === "" || this.props.userEmail === ""){
			alert("Please enter valid email and password");
		} else {

			ev.preventDefault();

			const pwd = this.state.userPwd;
			this.setState({	userPwd: "" });

			this.props.handleCreateUser(pwd)
				.then((data) => {
					console.log("(LandingPage) user account created! new user data: ", data);
					/* programmatically navigate to interests & skills page, with state object */
					this.setState({
						redirTo: "/interestSkills"
					});
				})
				.catch(err => {
					console.log("(LandingPage) user account creation failed with error: ", err);
					alert("Error creating new account: " + err.message);
					this.setState({
						userPwd: "",
					});
				});
			}
	}

	setShow(content_to_show) {
		this.setState({
			show: content_to_show
		});
	}

	purposeful_Signup () {
		if (!this.state.nameSet) {
			return (
				<div>
					<div className="row fullrow">
						<form onSubmit={this.handleContinue}>
							<div className="input-field col s4 push-s4">
								<input
									type="text"
									placeholder="What is your name?"
									value={this.props.userName}
									onChange={this.handleNameSet}
									id="name_in"
									name="fullName" />
								<input className="btn light-green" type="submit" value="Continue"/>
							</div>
						</form>
					</div>
				</div>
			);
		} else if (this.state.nameSet) {
			return (
				<div>
					<form>
						<div className="row fullrow">
							<div className="input-field col s4 push-s4">
								<input
									placeholder="Email"
									value={this.props.userEmail}
									onChange={this.handleEmailSet}
									type="text"
									name="Email"
									className="active validate"
									required
								/>
							</div>
						</div>
						<div className="row fullrow">
							<div className="input-field col s4 push-s4">
								<input
									placeholder="Password"
									value={this.state.userPwd}
									onChange={this.userPwdSet}
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
									onClick={this.handleSubmit}
									className="btn light-green"
								> Sign Up
								</button>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}

	purposeful_Login () {
		return (
			<div>
				<form>
					<div className="row fullrow">
						<div className="input-field col s4 push-s4">
							<input
								placeholder="Email"
								onChange={this.handleEmailSet}
								value={this.props.userEmail}
								type="text"
								name="Email"
								className="active validate"
								required
							/>
						</div>
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
					<div className="col s8 push-s5">
						<div className="col s1">
							<a href="https://facebook.com"> <FaFacebook className="facebook-icon" /></a>
						</div>
						<div className="col s1" >
							<a href="https://google.com"> <FaGoogle className="google-icon" /></a>
						</div>
						<div className="col s1" >
							<a href="https://linkedin.com"> <FaLinkedin className="linkedin-icon" /></a>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		if(this.props.isLoggedIn){
			this.setState({
				redirTo: "/home"
			});
		}
		if (this.state.redirTo !== "") {
			return (
				<Redirect to={this.state.redirTo} />
			);
		}

		switch (this.state.show) {
			case "signup":
				return (
					<div className="valign LandingBack">
						<div className="row fullrow">
							<div className="col s4 push-s4">
								<img className="logo" src={logo} alt="purposeful logo here" />
							</div>
						</div>
						<div className="row fullrow">
							<h1>Welcome to Purposeful</h1>
						</div>
						<div className="row fullrow">
							{this.purposeful_Signup()}
						</div>
						<div className="row fullrow">
							<h5 className="col s4 push-s4"> Or </h5>

						</div>
						<div className="row fullrow">
							<button
								className="btn light-green"
								onClick={() => this.setShow("login")}
							> Login
							</button>
						</div>
					</div>
				);
				break;
				case "login":
				return (
					<div className="valign LandingBack">
						<div className="row fullrow">
							<div className="col s4 push-s4">
								<img className="logo" src={logo} alt="purposeful logo here" />
							</div>
						</div>
						<div className="row fullrow">
							<h1>Welcome to Purposeful</h1>
						</div>
						<div className="row fullrow">
							{this.purposeful_Login()}
						</div>
						<div className="row fullrow">
							<h5 className="col s4 push-s4"> Or </h5>
						</div>
						<div className="row fullrow">
							<button
								className="btn light-green"
								onClick={() => this.setShow("signup")}
							>Sign up
							</button>
						</div>
					</div>
				);
				break;
				default:
				break;
		}

	}
}

export default LandingPage;
