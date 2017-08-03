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
      <article>

        <section>
        { this.props.isFormShowing ?
            <form id="signupForm">
              <p>  Sign up for our mailing list to keep up to date with Purposeful. </p>

              <input type="text" name="first" placeholder="First Name" onChange={this.handleChange} autoFocus required />
              <input type="text" name="last" placeholder="Last Name" onChange={this.handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={this.handleChange} required />
              <input type="button" value="Join our mailing list!" onClick={() => this.props.onClick()}/>
            </form>
          :
            <h4>Democratizing the web through the free sharing of knowledge and great ideas. </h4>
        }
        </section>


      </article>
    );
  }// end of render()

}

export default SignupForm;
