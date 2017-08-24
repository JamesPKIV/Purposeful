import React, { Component } from 'react';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  handleSubmit(event) {

    //prevent form reset
    event.preventDefault();
    //if form is valid, send it
    if (event.target.checkValidity() === true) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <form id="signupForm" className="flex-box-col flex-box-between" onSubmit={this.handleSubmit}>
        <p className="sign-up-p">  Sign up for our mailing list and we'll send you an invite when we launch! </p>
        <div className="flex-box-stretch flex-item fullwidth">
          <input type="text" name="first" className="input-greyed input-block" placeholder="First Name" onChange={this.handleChange} autoFocus required />
          <span className="red">*</span>
        </div>
        <div className="flex-box-stretch flex-item fullwidth">
          <input type="text" name="last"  className="input-greyed input-block" placeholder="Last Name" onChange={this.handleChange} required />
          <span className="red">*</span>
        </div>
        <div className="flex-box-stretch flex-item fullwidth">
          <input type="email" name="email"  className="input-greyed input-block" placeholder="Email" onChange={this.handleChange} required />
          <span className="red">*</span>
        </div>
        <div id="div-interest" className="flex-box-stretch flex-item fullwidth">
          <textarea name="interest" rows="3" className="input-greyed input-block" placeholder="Let us know why you're interested! (optional) " onChange={this.handleChange} />
          {/*this span is here to align interest textarea with previous input elements */}
          <span style={{visibility:"hidden"}} >*</span>
        </div>
        <div className="div-submit flex-item" ><input type="submit" value="Subscribe" className="input-block"/></div>
      </form>
    );
  }// end of render()

}

export default SignupForm;
