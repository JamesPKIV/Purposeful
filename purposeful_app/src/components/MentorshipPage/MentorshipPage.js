import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import MentorFeed from "../MentorFeed/MentorFeed";
import Search from 'react-icons/lib/fa/search';
import NavBar from '../NavBar/NavBar';
import './MentorshipPage.css';

class MentorshipPage extends Component {

	constructor (props) {
		super(props);

		this.state = {
			searchInput: "",
			show: "main",
		};
	}

	componentDidMount() {

		//make API calls to populate this page's data
		this.props.fetchData();

	}


	handleSearchChange (event) {
		this.setState({
			searchInput: event.target.value,
		});
	}


	handleSearchSubmit () {
		if (this.state.searchInput !== "") {
			this.props.handleSearchBySkill(this.state.searchInput)
				.then ( () => {
					this.setState({ 
						show: "searchResults",
					});
				})
				.catch ( () => {
					this.setState({
						show: "SearchError",
					});
				});
		}

	}


	render () {
		
		/* conditionally render form content depending on whether youve signed up or not */
		switch(this.state.show) {

		case "main":
			return(
				<div>
				<NavBar /> 
				<article className="mentorship-content">
					<div> 
						<h4> Find someone who knows about: </h4>
						<input  className="searchInput" 
							placeholder="Something, Anything!"
							value={this.state.searchInput}
							onChange={this.handleSearchChange} 
						/>		
						<button onClick={this.handleSearchSubmit}>
							<Search /> {/*search icon */}
						</button>
					</div>

					<ActivityFeed linkTo="" title="My Mentorship Activity"/> 
					<ActivityFeed linkTo="" title="My Mentees" feedItems={this.props.mentees} /> 
					<ActivityFeed linkTo="" title="My Mentors" feedItems={this.props.mentors} /> 
				</article>
				</div>
			);

		case "searchResults":
			return (
				<article >
					<MentorFeed 
						title="Search Results"
						feedItems={this.props.SkillUsersMap[this.state.searchInput]} 
					/>
				</article>
			);



		case "searchError": 
			return (
				<article >
					<p> 
						There was an error retrieving your search results.  
						<br/> 
						Please try again later.
					</p>
				</article>
			);
		
		default: 
			// do nothing
		}
	}
}


export default withRouter(MentorshipPage);
