import React, { Component } from 'react';
import SignupForm from '../SignupForm/SignupForm.js';
import SignupThanks from '../SignupThanks/SignupThanks.js';


class SignupContent extends Component {

	constructor (props) {
	    super(props);
	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleFormReset = this.handleFormReset.bind(this);
	    this.state = {
			first: '',
			last: '',
			email: '',
			mList: [],
			isSignedUp: false,
	    };
	}


	/* updates the state when the user changes any input in the form */
	handleInputChange(event) {

		const inputName = event.target.name;
		const inputVal = event.target.value;

		this.setState({
			[inputName]: inputVal
		});
	}


	/* submits the form data to the Firebase mailing list */
	handleSubmit() {
		let newEntry = {
		"first": this.state.first,
		"last": this.state.last,
		"email": this.state.email,
		};
		try {
			let newUidRef = this.props.mlRef.child(newEntry.email.toLowerCase().replace(/\./g, '%2E') );

			/* send data to Firebase mailing list. entry stored at auto generated UID */
			newUidRef.set(newEntry, (err) => {
				if (err == null) {
					alert("You have sucessfully joined our mailing list!");
					this.setState({isSignedUp: true});
					this.props.onFormUnmount();
				}
				else {
					alert("We weren't able to sign you up because your email is already on our mailing list,"+
						" but we appreciate your enthusiasm!");
				}
			});
		}
		 catch (err) {
		 	alert("We weren't able to sign you up at this time, but we want you to be a part of Purposeful. "+
		 		"If the problem persists, please let us know by sending us an email!");

			console.log("Firebase error: "+ err.message);
		 }

	}


	/* clear the form data and show form */
	handleFormReset() {
		this.setState({
			first: '',
			last: '',
			email: '',
			isSignedUp: false
		});

	}


	render () {

		/* conditionally render form content depending on wether youve signed up or not */
		return (
			<article>
				{
					this.props.isFormShowing || !this.state.isSignedUp?
			        <SignupForm handleChange={this.handleInputChange} onSubmit={this.handleSubmit}
			        	isFormShowing={this.props.isFormShowing} onUnmount={this.props.onFormUnmount} 
		        	/> :

		        	<SignupThanks firstName={this.state.first} /> 
			    }
			</article>
        );
	}
}

export default SignupContent;
