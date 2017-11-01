import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CollabPage.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";

class CollabPage extends Component {

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
				<NavBar />
				<div className="main-content">
					<img src={working} alt="working" width="300vw"/>
					<p className="row"> This part is not ready, but you should still start a great project!</p>
					<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
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

export default CollabPage;
