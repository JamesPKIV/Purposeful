import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import { Link } from "react-router-dom";
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

	purposeful_Signup = () => {
		if (!this.state.nameSet) {
			return (
				<div>
					<div className="row fullrow">
						<div className="input-field col s4 push-s4">
							<input placeholder="What is your name?"  type="text" name="FirstName" className="active validate" required/>
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
		}else if(this.state.nameSet) {
			return(
				<div className="row fullrow">
					<div className="input-field col s4 push-s4">
						<input placeholder="Email?" className="active validate" type="text" name="Email" required/>
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
						<Link to={{"pathname":"/home", "state":{"isLoggedIn":true} }}>
              <h2 className="login-h2">Login</h2>
				    </Link>
					</div>
				</div>
				<div className="row fullrow">
					<div className="col s8 push-s5">
						<div className="col s1">
							<a href="https://facebook.com"> <FaFacebook className="facebook-icon"/></a>
						</div>
						<div className="col s1" >
							<a href="https://google.com"> <FaGoogle className="google-icon"/></a>
						</div>
						<div className="col s1" >
							<a href="https://linkedin.com"> <FaLinkedin className="linkedin-icon"/></a>
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
							<img className="logo" src={logo} />
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
