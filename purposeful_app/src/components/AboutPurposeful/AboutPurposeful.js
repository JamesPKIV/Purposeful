import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AboutPurposeful.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";

class AboutPurposeful extends Component {

	constructor() {
		super();
		this.state = {
			/*add state variables here*/
		};
		/*bind functions here*/
	}

  Desktop(){
    return(
      <span>
				<NavBar/>
				<div className="main-content">
					<img src={working} alt="working" width="300vw" className="row center"/>
					<p className="row"> We are hard at work to tell you more about us soon! </p>
					<Link to="/landing" className="center btn light-green row">Back to Landing Page </Link>
				</div>
			</span>
    );
  }

  Mobile(){
    return(
      <span>
				<NavBar/>
				<div className="main-content">
					<img src={working} alt="working" width="100vw" className="row center"/>
					<p className="row"> We are hard at work to tell you more about us soon! </p>
					<Link to="/landing" className="center btn light-green row">Back to Landing Page </Link>
				</div>
			</span>
    );
  }

  render() {
		if(window.innerWidth > 700){
			return(
				this.Desktop()
			);
		} else {
			return(
				this.Mobile()
			);
		}
	}
}

export default AboutPurposeful;
