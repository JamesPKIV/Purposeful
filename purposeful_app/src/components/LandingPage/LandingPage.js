import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

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
				<img className="logo" src={logo}/>
        <h1>Become Prposeful</h1>
				<button className="arrowButton"> <FaAngleDown/> </button>

        <div className="navLinks">
          <p>
            <a href="dummy1"> _About_Purposeful_ </a>
            <a href="dummy2"> _Our_Team_ </a>
            <a href="dummy3"> _Donate_ </a>
            <a href="dummy4"> _Privacy_Policy_ </a>
          </p>
        </div>

      </div>
    );
  }
}
export default LandingPage;
