import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StoriesNew.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";

class StoriesNew extends Component {

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
				<div>
					<img src={working} alt="working" width="300vw" className="row center"/>
					<p className="row"> We want to hear your story! Soon you can create one here! </p>
					<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
				</div>
			</span>
    );
  }

  Mobile(){
    return(
      <span>
				<NavBar/>
				<div>
					<img src={working} alt="working" width="100vw" className="row center"/>
					<p className="row"> We want to hear your story! Soon you can create one here!</p>
					<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
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
				this.sMobile()
			);
		}
	}
}

export default StoriesNew;
