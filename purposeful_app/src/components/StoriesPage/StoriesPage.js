import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './StoriesPage.css';
import NavBar from '../NavBar/NavBar';
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
				<NavBar/>
				<div>
					<img src={working} alt="working" width="300vw" className="row center"/>
					<p className="row">  Soon you will be able to find stories here!</p>
					<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
				</div>
			</span>
    );
  }

  Mobile(){
		console.log("here");
    return(
      <span>
				<NavBar/>
				<div>
					<img src={working} alt="working" width="100vw" className="row center"/>
					<p className="row"> Soon you will be able to find stories here!</p>
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
				this.Mobile()
			);
		}
	}
}

export default StoriesPage;
