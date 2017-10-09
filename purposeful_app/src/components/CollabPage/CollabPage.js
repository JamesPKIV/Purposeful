import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CollabPage.css';
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
				<img src={working} alt="working" width="300vw" className="row center"/>
				<p className="row"> This part is not ready, but you should still start a great project!</p>
				<Link to="/profile" className="center btn light-green row">Back to your profile </Link>
			</span>
    );
  }

  Mobile(){
    return(
      <span>
				<img src={working} alt="working" width="100vw" className="row center"/>
				<p className="row"> This part is not ready, but you should still start a great project!</p>
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
				this.Mobile()
			);
		}
	}
}

export default CollabPage;
