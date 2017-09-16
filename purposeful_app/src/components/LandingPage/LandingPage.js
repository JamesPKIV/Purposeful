import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaFacebook from 'react-icons/lib/fa/facebook-square';
import FaLinkedin from 'react-icons/lib/fa/linkedin-square';
import FaGoogle from 'react-icons/lib/fa/google-plus-square';

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			inputInfo: false,
			nameSet: false
		};
	}

	toggle = () => {
		this.setState({
			nameSet: !this.state.nameSet
		});
	}

	becomePurposeful = () => {
		return (
			<div>
				<h1>Welcome to Purposeful</h1>
			</div>
		);
	}

	purposeful_Signup = () => {
		if (!this.state.nameSet) {
			return (
				<div>
					<input className="inputName" type="text" name="FirstName" value="What is your name?" />
					<div><a className="continueButton btn" onClick={this.toggle}>Continue<i className="arrowIcon material-icons">arrow_forward</i> </a></div>
				</div>
			);
		}else if(this.state.nameSet) {
			return(
			<div>
				<input className="inputName" type="text" name="FirstName" value="Email" />
			</div>
			);
		}
	}

	purposeful_Login = () => {
		return (
			<div className="login-div">
				<h2 className="login-h2"> Login </h2>
				<ul className="icons-list">
					<li className="login-icon"><div><a href="https://facebook.com"> <FaFacebook className="facebook-icon"/></a></div></li>
					<li className="login-icon"><div><a href="https://google.com"> <FaGoogle className="google-icon"/></a></div></li>
					<li className="login-icon"><div><a href="https://linkedin.com"> <FaLinkedin className="linkedin-icon"/></a></div></li>
				</ul>
			</div>
		);

	}

	render() {
		return (
			<div className="LandingBack">
				<img className="logo" src={logo} />
				{this.becomePurposeful()}
				{this.purposeful_Signup()}
				{this.purposeful_Login()}

				<div className="footer-bar">
					<div className="navLinks">
						<p>
							<a href="dummy1"> _About_Purposeful_ </a>
							<a href="dummy2"> _Our_Team_ </a>
							<a href="dummy3"> _Donate_ </a>
							<a href="dummy4"> _Privacy_Policy_ </a>
						</p>
					</div>
				</div>

			</div>
		);
	}
}
export default LandingPage;
