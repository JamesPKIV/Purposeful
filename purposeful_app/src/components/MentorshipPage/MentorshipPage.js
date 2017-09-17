import React, { Component } from 'react';
import ActivityFeed from "../ActivityFeed/ActivityFeed";


class MentorshipPage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : true
		};
	}

	render () {
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<article className="mentorship-content">
				{
					this.state.isLoggedIn ?
			        <p> you are logged in, and this is your mentorship page. </p>
                    :
                    <p> you are NOT logged in, and this is your mentorship page. </p>
			    }
			    <ActivityFeed linkTo="" title="My Mentorship Activity"/> 
			    <ActivityFeed linkTo="" title="My Mentees"/> 
			    <ActivityFeed linkTo="" title="My Mentors"/> 
			</article>
        );
	}
}

export default MentorshipPage;
