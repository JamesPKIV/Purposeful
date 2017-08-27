import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOldFormShowing: false
    }
    this.handleGoogleSignup = this.handleGoogleSignup.bind(this);
    this.handleGoogleFailure = this.handleGoogleSignup.bind(this);
    this.showOldForm = this.showOldForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleGoogleSignup(response) {
    console.log(response);
    //response is info from Google about signed in user
    this.props.onOauth({
      first: response.getBasicProfile().getName().split(" ")[0],
      last: response.getBasicProfile().getName().split(" ")[1],
      email: response.getBasicProfile().getEmail()
    });
    this.props.submitForm();
  }

  handleGoogleFailure(response) {
    //response is info from Google about signed in user
    alert("Google signup failed! Please try again with a different method.");
    console.log(response);
  }

  handleFormSubmit(event) {
    //prevent form reset
    event.preventDefault();
    //if form is valid, send it
    if (event.target.checkValidity() === true) {
      this.props.submitForm();
    }
  }

  handleFormChange(event) {
    this.props.onFormChange(event);
  }

  showOldForm() {
      this.setState({
        isOldFormShowing: true
      });
  }

  render() {
    return (
      <article>
        <section>
          <div id="signupForm">
            <p className="sign-up-p">Join our mailing list and we'll let you know when we launch!</p>

            <p className="sign-up-p">Sign up through:</p>
            <GoogleLogin
                clientId="842888689213-kilqknpjr5p0ulhvo3obl8b2l04gsced.apps.googleusercontent.com"
                buttonText="Google"
                className="googleButton"
                onSuccess={this.handleGoogleSignup}
                onFailure={this.handleGoogleFailure}
            />

            <p>-- or --</p>

            {
              this.state.isOldFormShowing ?
                <form id="old-form" onSubmit={this.handleFormSubmit} >
                  <div className="flex-box-stretch flex-item fullwidth">
                    <input type="text" name="first" className="input-greyed input-block" placeholder="First Name" onChange={this.handleFormChange} autoFocus required />
                    <span className="red">*</span>
                  </div>
                  <div className="flex-box-stretch flex-item fullwidth">
                    <input type="text" name="last"  className="input-greyed input-block" placeholder="Last Name" onChange={this.handleFormChange} required />
                    <span className="red">*</span>
                  </div>
                  <div className="flex-box-stretch flex-item fullwidth">
                    <input type="email" name="email"  className="input-greyed input-block" placeholder="Email" onChange={this.handleFormChange} required />
                    <span className="red">*</span>
                  </div>
                  <div id="div-interest" className="flex-box-stretch flex-item fullwidth">
                    <textarea name="interest" rows="3" className="input-greyed input-block" placeholder="Let us know why you're interested! (optional) " onChange={this.handleFormChange} />
                    {/*this span is here to align interest textarea with previous input elements */}
                    <span style={{visibility:"hidden"}} >*</span>
                  </div>
                  <div className="div-submit flex-item" ><input type="submit" value="Subscribe" className="btn"/></div>
                </form>

              :
                <button id="show-old-form-btn" className="btn" onClick={this.showOldForm}> Leave us your email! </button>
            
            }

            </div>
          </section>
        </article>
    );
  }
    
}

export default SignupForm;
