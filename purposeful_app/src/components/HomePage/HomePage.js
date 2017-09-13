import React, { Component } from 'react';
import './HomePage.css';

class HomePage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false
		}
	}
	

	render () {
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<article className="home-content">
				{
					this.state.isLoggedIn ?
			        <p> you are logged in, and this is your home page. </p>
                    :
                    <p> you are NOT logged in, and this is your home page. </p>
			    }
			</article>
        );
	}
}

export default HomePage;
