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

  componentWillUnmount () {
    this.props.onUnmount();
  }


  render() {



    return (
      <article>

        <section>
        { this.props.isFormShowing &&
            <form id="signupForm" onSubmit={this.handleSubmit}>
              <p className="sign-up-p">  Sign up for our mailing list to keep up to date with Purposeful. </p>

              <input type="text" name="first" placeholder="First Name" onChange={this.handleChange} autoFocus required />
              <input type="text" name="last" placeholder="Last Name" onChange={this.handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={this.handleChange} required />
              <div className="div-input" ><input type="submit" value="Subscribe" /></div>
            </form>
        }
        </section>


      </article>
    );
  }// end of render()

}

export default SignupForm;
