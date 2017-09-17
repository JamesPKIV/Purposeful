import React, { Component } from 'react';
import './HomePage.css';
import ActivityFeed from '../ActivityFeed/ActivityFeed'

class HomePage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : true
		};
	}


	render () {

		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<article className="home-content">
				{
					this.state.isLoggedIn ?
			        <p> you are logged in, and this is your home page. </p>
			        : <p> you are NOT logged in, and this is your home page. </p>
			    } 

			    <div>
				    {
				    	this.state.isLoggedIn  && 
				        <ActivityFeed title="Activity in Your Network" linkTo="/home" />
	                }
                	
                	<ActivityFeed title="Mentors" linkTo="/mentorship" />
                	<ActivityFeed title="Mentees" linkTo="/mentorship" />
                	<ActivityFeed title="Collaborations" linkTo="/home" />
            	</div>
			    
			</article>
        );
	}
}

export default HomePage;
