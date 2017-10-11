import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StoriesPage.css';
import working from "../App/still_working.png";

class StoriesPage extends Component {

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
				<img src={working} alt="working" width="300vw" className="row center"/>
				<p className="row"> We want to hear your story! Soon you can share it here! </p>
				<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
			</span>
    );
  }

  Mobile(){
    return(
      <span>
				<img src={working} alt="working" width="100vw" className="row center"/>
				<p className="row"> We want to hear your story! Soon you can share it here!</p>
				<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
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
				this.sMobile()
			);
		}
	}
}

export default StoriesPage;
