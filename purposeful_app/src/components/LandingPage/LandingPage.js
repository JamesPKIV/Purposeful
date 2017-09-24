import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import { Route, Link, withRouter } from "react-router-dom";
import FaFacebook from 'react-icons/lib/fa/facebook-square';
import FaLinkedin from 'react-icons/lib/fa/linkedin-square';
import FaGoogle from 'react-icons/lib/fa/google-plus-square';
import Client from "../../Client";


class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			inputInfo: false,
			nameSet: false,
			userName: "tester",
			userEmail: "test@bepurposeful.co",
			userPwd: "test",
		};
		this.userNameSet = this.userNameSet.bind(this);
		this.userInfoSet = this.userEmailSet.bind(this);
		this.userPwdSet = this.userPwdSet.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
	}

	toggle = () => {
		this.setState({
			nameSet: !this.state.nameSet
		});


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

	userPwdSet = (e) =>{
		this.setState({
			userPwd: e.target.value,
		});
	}

	handleCreateUser = (hist) => {
		const name = this.state.userName;
		const email = this.state.userEmail;
		const pwd = this.state.userPwd;

		Client.create_user(name, email, pwd, (data) => {
			console.log("(LandingPage) user account created! new user data: ", data);
			alert("user account created! new user id: "+ data.id);
			/* navigate to home page */
			console.log("history: ", hist);
			hist.push('/home', {isLoggedIn: true, uid: data.id, name: data.name}); 
		});

		
		
   }

	


	purposeful_Signup = () => {
		if (!this.state.nameSet) {
			return (
				<div>
					<div className="row fullrow">
						<div className="input-field col s4 push-s4">
							<input placeholder={this.state.userName} onChange={this.userNameSet} type="text" name="FirstName" className="active validate" required />
						</div>
					</div>
					<div className="row fullrow">
						<div className="col s4 push-s4">
							<a className="btn light-green" onClick={this.toggle}>
								Continue<i className="arrowIcon material-icons">arrow_forward</i>
							</a>
						</div>
					</div>
				</div>
			);
		} else if (this.state.nameSet) {
			return (
				<div>
					<div className="row fullrow">
						<div className="input-field col s4 push-s4">
							<input placeholder={this.state.userEmail}  onChange={this.userEmailSet} type="text" name="Email" className="active validate" required />
						</div>
					</div>
					<div className="row fullrow">
						<div className="input-field col s4 push-s4">
							<input placeholder={this.state.userPwd} onChange={this.userPwdSet} className="active validate" type="text" name="Email" required />
						</div><br />
					</div>
					<div className="row fullrow">
						<div className="col s4 push-s4">
							<Route render={ ({history}) => (
								<button className="btn light-green"	onClick={() => {this.handleCreateUser(history)}}>
										Create Account<i className="arrowIcon material-icons">arrow_forward</i>
								</button>
							)} />
						</div>
					</div>
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
export default withRouter(LandingPage);
