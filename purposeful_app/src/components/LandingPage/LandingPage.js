import React, { Component } from 'react';
import './LandingPage.css';
import logo from './logo.png';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

class LandingPage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false,
			inputInfo: false
		};
  }

	toggle = () => {
        this.setState ({
          inputInfo : !this.state.inputInfo
        });
  }

	becomePurposeful(){
		if (this.state.inputInfo){
			return (
				<div>
					<h1>Become Prposeful</h1>
					<input className="inputName" type="text" name="FirstName" value="Tell Us Your Name"/>
					<a className="contGuest" href="dummy5"> Continue as Guest </a>
					<button className="arrowButtonUp" onClick={this.toggle}> <FaAngleUp/> </button>
				</div>
			)
		} else {
			return(
				<div>
					<h1>Become Prposeful</h1>
					<button className="arrowButtonDown" onClick={this.toggle}> <FaAngleDown/> </button>
				</div>
			);
		}
	}

  render(){
    return(
      <div className="LandingBack">
				<img className="logo" src={logo}/>
        {this.becomePurposeful()}

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
