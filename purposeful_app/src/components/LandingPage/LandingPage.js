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
			redirToSkills: false,
		};
		this.handleContinue = this.handleContinue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.purposeful_Signup = this.purposeful_Signup.bind(this);
		this.handleNameSet = this.handleNameSet.bind(this);
		this.handleEmailSet = this.handleEmailSet.bind(this);
		this.userPwdSet = this.userPwdSet.bind(this);
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

	handleContinue (ev) {
		ev.preventDefault();
		this.setState({
			nameSet: !this.state.nameSet,
		});
	}

	handleSubmit(ev) {
		ev.preventDefault();

		const pwd = this.state.userPwd;
		this.setState({	userPwd: "" });

		this.props.handleCreateUser(pwd)
			.then((data) => {
				console.log("(LandingPage) user account created! new user data: ", data);
				/* programmatically navigate to interests & skills page, with state object */
				this.setState({
					redirToSkills: true
				});
			})
			.catch(err => {
				console.log("(LandingPage) user account creation failed with error: ", err);
				alert("Error creating new user account: " + err);
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
									name="fullName" />
								<input className="btn light-green" type="submit" value="Continue " />
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
								<input placeholder="Email" onChange={this.handleEmailSet} type="text" name="Email" className="active validate" required />
							</div>
						</div>
						<div className="row fullrow">
							<div className="input-field col s4 push-s4">
								<input placeholder="Password" onChange={this.userPwdSet} className="active validate" type="password" name="Password" required />
							</div><br />
						</div>
						<div className="row fullrow">
							<div className="col s4 push-s4">
								<Link onClick={this.handleSubmit} to={{ pathname:"/interestskills" }}>
									<div className="btn light-green">Sign Up </div>
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
			<div>
				<div className="row fullrow">
					<div className="col s4 push-s4">
						<Link to={{ "pathname": "/home" }}>
							<h2 className="login-h2">Login</h2>
						</Link>
					</div>
				</div>
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

		if (this.state.redirToSkills) {
			return (
				<Redirect to="/interestskills" />
			);
		}

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
					{this.purposeful_Login()}
				</div>
			</div>
		);
	}
}

export default LandingPage;
