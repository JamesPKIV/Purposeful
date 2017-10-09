import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditProfile.css';
import working from "../App/still_working.png";

class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			/*add state variables here*/
		};
		/*bind functions here*/
	}

  Desktop(){
    return(
      <p>HERE</p>
    );
  }

  Mobile(){
    return(
      <span>
				<img src={working} alt="working" width="100vw" className="row center"/>
				<p className="row"> For now this is not implemented, but edit your profile in a desktop!</p>
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

export default EditProfile;
