import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import MentorFeed from "../MentorFeed/MentorFeed";
import Search from 'react-icons/lib/fa/search';
import NavBar from '../NavBar/NavBar';
import './MentorshipPage.css';
import Modal from 'react-modal';

//Style for modal messages!!
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class MentorshipPage extends Component {

	constructor (props) {
		super(props);

		this.state = {
			searchInput: "",
			show: "main",
			modalIsOpen: false
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
	}

	componentWillMount(){
		Modal.setAppElement('body');
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

	toggleModal(){
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	}

	afterOpenModal(){
		// references are now sync'd and can be accessed.
	}

	handleSearchSubmit () {
		if (this.state.searchInput !== "") {
			this.props.handleSearchBySkill(this.state.searchInput)
				.then ( () => {
					this.setState({
						show: "searchResults",
					});
				})
				.catch (err => {

					console.log("(MentorshipPage.js) Error after searching:" + err);
					this.setState({
						show: "searchError",
					});
				});
		} else {
			this.toggleModal();
		}
	}


	render () {
		window.scrollTo(0,0);
		/* conditionally render form content depending on whether youve signed up or not */
		switch(this.state.show) {

		case "main":
			return(
				<span>
					<NavBar />
					<div className="main-content">
						<div className="container">
							<div className="row">
								<h4 className="col s12 m12 l12"> Find someone who knows about: </h4>
							</div>
							<div className="row">
								<input autoFocus
									className="searchInput"
									placeholder="Something, Anything!"
									value={this.state.searchInput}
									onChange={this.handleSearchChange}
								/>
								<button className="btn light-green" onClick={this.handleSearchSubmit}>
									<Search /> {/*search icon */}
								</button>
								<Modal
									isOpen={this.state.modalIsOpen}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={()=>this.toggleModal()}
									contentLabel="searchmodal"
									style={customStyles}
								>
									<h5> Error </h5>
									<p> Please enter a skill or interest before you search</p>
									<div className="btn light-green" onClick={()=>this.toggleModal()}>Got It</div>
								</Modal>
							</div>
							<div className="row">
								<ActivityFeed linkTo="" title="My Mentorship Activity"/>
								<ActivityFeed linkTo="" title="My Mentees" feedItems={this.props.mentees} />
								<ActivityFeed linkTo="" title="My Mentors" feedItems={this.props.mentors} />
							</div>
						</div>
					</div>
				</span>
			);

		case "searchResults":
			return (
				<div className="row fullrow">
					<MentorFeed
						title="Search Results"
						feedItems={this.props.skillsUsersMap[this.state.searchInput]}
					/>
				</div>
			);



		case "searchError":
			var a = "'";
			return (
				<span >
					<p>
						There was an error retrieving your search results, but don{a}t give up!
						<br/>
						Please try again later.
					</p>
				</span>
			);

		default:
			// do nothing
		}
	}
}


export default withRouter(MentorshipPage);
