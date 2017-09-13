import React, { Component } from 'react';

class ProfilePage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false
		}
	}
	

	render () {
		/* conditionally render form content depending on whether youve signed up or not */
		return (
			<article className="profile-content">
				{
					this.state.isLoggedIn ?
			        <p> you are logged in, and this is your profile page. </p>
                    :
                    <p> you are NOT logged in, and this is your profile page. </p>
			    }
			</article>
        );
	}
}

export default ProfilePage;
