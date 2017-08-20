import React, { Component } from 'react';
import './SignupThanks.css';


class SignupThanks extends Component {

	render () {
		return (
			<section className = "thanksSection semi-transparent-box">
			  <p>Thanks for signing up{this.props.firstName && <strong> {this.props.firstName}</strong>}! <br/>
			   We'll keep you up to date about our launch. <br/>
			   Help us spread the word!
			  </p>

			  <button id='formResetBtn' onClick={() => this.props.onClick()}>
			    Reset Signup Form 
			  </button>
			</section>
		);
	}
}

export default SignupThanks;