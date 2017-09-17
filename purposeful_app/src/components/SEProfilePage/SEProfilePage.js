import React, { Component } from 'react';
import './SEProfilePage.css';

class SEProfilePage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false,
		};
  }

	render(){
		return(
<p> This is Someone Elses Profile!! </p>

		);
	}
}

export default SEProfilePage;
