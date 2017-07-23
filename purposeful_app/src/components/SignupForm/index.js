import React, { Component } from 'react';
import './SignupForm.css';

class SignupForm extends Component {
  render() {
    return (
        <form id="signupForm">
          <label labelFor="firstName">First Name</label>
          <input type="text" id="firstName" autofocus required />
          
          <label labelFor="lastName">Last Name</label>
          <input type="text" id="lastName" required />

          <label labelFor="email">Email</label>
          <input type="email" id="email" required />

          <input type="submit" value="Join our mailing list!" />
            
        </form>

    );
  }
}

export default SignupForm;