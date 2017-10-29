import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './HomePage.css';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import MentorFeed from "../MentorFeed/MentorFeed";
import NavBar from '../NavBar/NavBar';

class HomePage extends Component {


	constructor(props) {
		super(props);
		this.state = {
			searchInput: "",
			redirectTo: "",
			seUserId: "",
		};
		
		this.handleSEProfileClick = this.handleSEProfileClick.bind(this);
	}



	componentDidMount () {
		this.props.fetchData();
	}

	handleSEProfileClick(se_user_id) {
		this.setState({
			redirectTo: {
				pathname: "/SEprofile",
				search: se_user_id,
			}
		});

	}

	render () {

		if (this.state.redirectTo !== "") {
			return ( <Redirect to={this.state.redirectTo} />);
		}
		else {
			/* conditionally render form content depending on whether youve signed up or not */
			return (
				<div id="home-content" className="row">
					<NavBar />
					{
						this.props.isLoggedIn ?
						<p className="logged-in-p">User Name: {this.props.userName}, UserID: {this.props.userId} </p>
						: <p className="logged-in-p"> you are NOT logged in, and this is your home page. </p>
					}
					<div className="activity-feeds col l10 push-l1">
					{
							this.props.isLoggedIn  &&
							<MentorFeed title="Mentors you may like"
								feedItems={this.props.recommended}
								handleClick={this.handleSEProfileClick}
							/>
					}
						<ActivityFeed title="Activity in Your Network" linkTo="/home" />
						<MentorFeed title="Mentees" linkTo="/mentorship" feedItems={this.props.mentees}/>
						<ActivityFeed title="Collaborations" linkTo="/collaborations" />

					</div>
				</div>
			);
		}
	}
}

export default HomePage;
