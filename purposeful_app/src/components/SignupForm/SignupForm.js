import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(response) {
    //response is info from Google about signed in user
    this.props.handleChange({
      first: response.getBasicProfile().getName().split(" ")[0],
      last: response.getBasicProfile().getName().split(" ")[1],
      email: response.getBasicProfile().getEmail()
    });
    this.props.onClick();
  }

  render() {
    return (
      <article>
        <section>
          <div id="signupForm">
            <p className="sign-up-p">Sign up for our mailing list to keep up to date with Purposeful.</p>
            <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Sign Up"
                className="googleButton"
                onSuccess={this.handleChange}
                onFailure={this.handleChange}
            />
          </div>
        </section>
      </article>
    );
  }
    
}

export default SignupForm;
