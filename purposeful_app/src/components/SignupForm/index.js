import React, { Component } from 'react';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    return (
        <form id="signupForm">
          <p>Sign up for our mailing list to keep up to date with Purposeful. </p>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="first" onChange={this.handleChange} autoFocus required />
          
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="last" onChange={this.handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={this.handleChange} required />

          <input type="button" value="Join our mailing list!" onClick={() => this.props.onClick()} />
            
        </form>

    );
  }
}

export default SignupForm;