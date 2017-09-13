import React, { Component } from 'react';

class MentorshipPage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false
		}
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
			</article>
        );
	}
}

export default MentorshipPage;
