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
				<div className="main-content">
					<img src={working} alt="working" width="300vw" className="row center"/>
					<p className="row">  Soon you will be able to find stories here!</p>
					<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
				</div>
			</span>
    );
  }

  render() {
		window.scrollTo(0,0);
		return(
			this.Desktop()
		);
	}
}

export default StoriesPage;
