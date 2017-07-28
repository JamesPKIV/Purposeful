import React, { Component } from 'react';
// import './SignupThanks.css';


class SignupThanks extends Component {

	render () {
		return (
			<section>
			  <p>Thanks for signing up! <br/>
			   We'll keep you up to date about our launch. <br/>
			   Help us spread the word!
			  </p>

			  <button onClick={() => this.props.onClick()}>
			    Reset Signup Form 
			  </button>
			</section>
		);
	}
}

export default SignupThanks;