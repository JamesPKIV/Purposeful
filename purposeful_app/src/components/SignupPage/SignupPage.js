import React, { Component } from 'react';
import SignupForm from '../SignupForm/SignupForm.js';
import SignupThanks from '../SignupThanks/SignupThanks.js';
import './SignupPage.css';

class SignupPage extends Component {

	constructor (props) {
	    super(props);
	    this.handleOauthChange = this.handleOauthChange.bind(this);
	    this.handleFormChange = this.handleFormChange.bind(this);
	    this.handleFormSubmit = this.handleFormSubmit.bind(this);
	    this.handleFormReset = this.handleFormReset.bind(this);
	    this.state = {
			first: '',
			last: '',
			email: '',
			interest: '',
			isSignedUp: false
	    };
	}

	/* updates the state when the user signs up through google*/
	handleOauthChange(OauthState) {
		this.setState(OauthState);
	}

	/* updates the state when the user changes any input in the old fashioned form */
	handleFormChange(event) {
		const inputName = event.target.name;
		const inputVal = event.target.value;

		this.setState({
		       [inputName]: inputVal
		});

	}


	/* submits the form data to the Firebase mailing list */
	handleFormSubmit() {
		/* stub to be filled in */

	}

	/* clear the form data and show form */
	handleFormReset() {
		this.setState({
			first: '',
			last: '',
			email: '',
			interest: '',
			isSignedUp: false
		});
	}

	render () {
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<article className="signup-Page">
				{
					this.state.isSignedUp ?
			        <SignupThanks
                        onClick={this.handleFormReset}
                        firstName={this.state.first}
                    /> :
			        <SignupForm
                        handleGoogle={this.handleOauthChange}
                        handleFacebook={this.handleOauthChange}
                        onFormChange={this.handleFormChange}
                        submitForm={this.handleFormSubmit} 
                    />

			    }
			</article>
        );
	}
}

export default SignupPage;
