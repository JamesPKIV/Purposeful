import React, { Component } from 'react';
import './HomePage.css';
import ActivityFeed from '../ActivityFeed/ActivityFeed'
import NavBar from '../NavBar/NavBar'

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: true
		};
	}


	render() {

		/* conditionally render form content depending on whether youve signed up or not */
		return (

			<div id="home-content" className="row">
					<NavBar />
				<div className="activity-feeds col l10 push-l1">
					<ActivityFeed title="Activity in Your Network" linkTo="/home" />
					<ActivityFeed title="Mentorship" linkTo="/mentorship" />
					<ActivityFeed title="Mentorship" linkTo="/mentorship" />
				</div>
			</div>
		);
	}
}

export default HomePage;
