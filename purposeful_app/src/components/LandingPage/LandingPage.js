import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false
		};
  }

  render(){
    return(
      <div className="LandingBack">
        <h1>Become Purposeful</h1>

        <div className="navLinks">
          <p>
            <a href="dummy"> About_Purposeful </a>
            <a href="dummy"> Our_Team </a>
            <a href="dummy"> Donate </a>
            <a href="dummy"> Privacy_Policy </a>
          </p>
        </div>

      </div>
    );
  }
}
export default LandingPage;
