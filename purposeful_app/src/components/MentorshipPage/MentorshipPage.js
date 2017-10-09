import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import NavBar from '../NavBar/NavBar';
import './MentorshipPage.css';

class MentorshipPage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : true
		};
	}

	componentWillMount = () => {
		var recieved_state = this.props.history.location.state;

		console.log("(Mentorship Page) componentDidMount state: ", recieved_state);
		if (recieved_state !== null) {
			this.setState( recieved_state );
			console.log ("(Mentorship Page) state recieved. New state: ", this.state);
		}


		//TODO: change this later to maybe randomly select a skill?
		//for now just grab the first skill the user selected
		/*
		Client.get_users_with_skill( recieved_state.chosen_interests[1] )
			.then(users => {
				this.setState({
					mentors_list: users 
				});
			});
			*/
	}


	render () {
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<div>
				<NavBar /> 
				<div className="mentorship-content">
					{
						this.state.isLoggedIn ?
						<p className="logged-in-p">User Name: {this.state.user_name}, UserID: {this.state.user_id} </p>
						:
						<p> you are NOT logged in, and this is your mentorship page. </p>
					}
				</div>
			</div>
        );
	}
}


export default withRouter(MentorshipPage);
