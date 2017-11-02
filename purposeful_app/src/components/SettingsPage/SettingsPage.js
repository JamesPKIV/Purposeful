import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SettingsPage.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";

class SettingsPage extends Component {

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
					<p className="row"> Soon you will be able to personalize your settings! </p>
					<Link to="/landing" className="center btn light-green row">Back to Landing Page </Link>
				</div>
			</span>
    );
  }

  render() {
		return(
			this.Desktop()
		);
	}
}

export default SettingsPage;
