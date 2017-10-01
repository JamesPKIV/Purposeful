import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import { NavLink, Route, Redirect, BrowserRouter as Router, Link} from "react-router-dom";
import FaFacebook from 'react-icons/lib/fa/facebook-square';
import FaLinkedin from 'react-icons/lib/fa/linkedin-square';
import FaGoogle from 'react-icons/lib/fa/google-plus-square';
import InterestSkills from '../InterestSkills/InterestSkills';

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			inputInfo: false,
			nameSet: false,
			userName: '',
			userEmail: "Email",
			userPwd: "Create a password",
		};
		this.userNameSet = this.userNameSet.bind(this);
		this.userInfoSet = this.userEmailSet.bind(this);
		this.userPwdSet = this.userPwdSet.bind(this);
	}

	userNameSet = (e) => {
		this.setState({
			userName: e.target.value,
		});
	}

	userEmailSet = (e) => {
		this.setState({
			userEmail: e.target.value,
		});
	}

	userPwdSet = (e) => {
		this.setState({
			userPwd: e.target.value,
		});
	}

	handleContinue = (e) => {
		e.preventDefault();
		this.setState({
			nameSet: !this.state.nameSet,
		});
	}

	handleSubmit = () => {

		//Collect data and send to next stage (interestSkills)
		alert("Name: " + this.state.userName + " " +
			"Email: " + this.state.userEmail + " " +
			"Password: " + this.state.userPwd);

		// Redirect to interestSkills page
	}

	purposeful_Signup = () => {
		if (!this.state.nameSet) {
			return (
				<div>
					<div className="row fullrow">
						<form onSubmit={this.handleContinue}>
							<div className="input-field col s4 push-s4">
								<input
									type="text"
									placeholder="What is your name?"
									value={this.state.userName}
									onChange={this.userNameSet}
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
					<form >
						<div className="row fullrow">
							<div className="input-field col s4 push-s4">
								<input placeholder="Email" onChange={this.userEmailSet} type="text" name="Email" className="active validate" required />
							</div>
						</div>
						<div className="row fullrow">
							<div className="input-field col s4 push-s4">
								<input placeholder={this.state.userPwd} onChange={this.userPwdSet} className="active validate" type="password" name="Password" required />
							</div><br />
						</div>
						<div className="row fullrow">
							<div className="col s4 push-s4">
								<Link onClick={this.handleSubmit} to={{"pathname":"/interestskills"}}>
									<div  type="submit" className="btn light-green">Sign In </div>
								</Link>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}

	purposeful_Login = () => {
		return (
			<div>
				<div className="row fullrow">
					<div className="col s4 push-s4">
						<Link to={{ "pathname": "/home", "state": { "isLoggedIn": true } }}>
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
