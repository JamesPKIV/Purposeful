import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleGoogle(response) {
    this.props.handleGoogle({
        first: response.getBasicProfile().getName().split(" ")[0],
        last: response.getBasicProfile().getName().split(" ")[1],
        email: response.getBasicProfile().getEmail()
    });
    this.props.onClick();
  }
    
  handleFacebook(response) {
    this.props.handleFacebook({
        first: response.name.split(" ")[0],
        last: response.name.split(" ")[1],
        email: response.email
    });
    this.props.onClick();
  }
    
  //IMPORTANT
  //Run this.handleEmail() when the button for form submit is clicked.
  handleEmail() {
      this.props.handleEmail({
          first: "", //Get first name from form
          last: "", //Get last name from form
          email: "" //Get email from form
      });
      this.props.onClick();
  }

  render() {
    return (
      <article>
        <section>
          <div id="signupForm">
            <p className="sign-up-p">Sign up for our mailing list to keep up to date with Purposeful!</p>
            <GoogleLogin
                buttonText="Google"
                className="authButton googleButton"
                clientId="842888689213-kilqknpjr5p0ulhvo3obl8b2l04gsced.apps.googleusercontent.com"
                onSuccess={this.handleGoogle}
                onFailure={this.handleGoogle}
            />
            <br />
            <FacebookLogin
                textButton="Facebook"
                cssClass="authButton facebookButton"
                appId="1667509349939492"
                fields="name,email,picture"
                callback={this.handleFacebook}
            />
            <hr />
            <button className="authButton emailButton">Email</button>
          </div>
        </section>
      </article>

    );
  }
    
}

export default SignupForm;
