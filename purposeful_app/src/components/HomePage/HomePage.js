import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import MentorFeed from "../MentorFeed/MentorFeed"
import NavBar from '../NavBar/NavBar';
import Client from "../../Client.js";



class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user_name: "",
			user_id: "",
			isLoggedIn : false
		};

	}



	componentDidMount () {
		var recieved_state = this.props.history.location.state;

		console.log("(HOMEPAGE) componentDidMount state: ", recieved_state);
		if (recieved_state !== null) {
			this.setState( recieved_state );
			console.log ("(HOMEPAGE) state recieved. New state: ", this.state);
		}

		//TODO: change this later to maybe randomly select a skill?
		//for now just grab the first skill the user selected
		Client.get_users_with_skill( recieved_state.chosen_interests[0] )
			.then(users => {
				this.setState({
					mentors_list: users 
				});
			});

	}


	render () {

		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<div id="home-content" className="row">
				{
					this.state.isLoggedIn ?
					<p> you are logged in {this.state.user_name}, id#{this.state.user_id}, and this is your home page. </p>
					: <p> you are NOT logged in, and this is your home page. </p>
				}
				<div className="activity-feeds col l10 push-l1">
					{
						this.state.isLoggedIn  &&
						<MentorFeed title="Mentors you may like"
							feedItems={this.state.mentors_list} 
						/>
					}

					<ActivityFeed title="Activity in Your Network" linkTo="/mentorship" />
					<ActivityFeed title="Mentees" linkTo="/mentorship" />
					<ActivityFeed title="Collaborations" linkTo="/home" />
				</div>
			</div>
		);
	}
}

export default withRouter(HomePage);
