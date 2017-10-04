import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import NavBar from '../NavBar/NavBar';


class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			uid: "",
			isLoggedIn : false
		};

	}



		componentDidMount () {
		var recieved_state = this.props.history.location.state;

		console.log("(HOMEPAGE) componentDidMount state: ", recieved_state);
		if (recieved_state !== null) {
			this.setState( recieved_state );
			console.log ("(HOMEPAGE) state recieved. New state: ", this.state);
		};
	}


	render () {

		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<div id="home-content" className="row">
				{
					this.state.isLoggedIn ?
					<p> you are logged in {this.state.name}, id#{this.state.uid}, and this is your home page. </p>
					: <p> you are NOT logged in, and this is your home page. </p>
				}
				<div className="activity-feeds col l10 push-l1">
					{
						this.state.isLoggedIn  &&
						<ActivityFeed title="Activity in Your Network" linkTo="/home" />
					}

					<ActivityFeed title="Mentors" linkTo="/mentorship" />
					<ActivityFeed title="Mentees" linkTo="/mentorship" />
					<ActivityFeed title="Collaborations" linkTo="/home" />
				</div>
			</div>
		);
	}
}

export default withRouter(HomePage);
