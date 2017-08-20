import React, { Component } from 'react';
import './DoContent.css';

import FaCaretRight from 'react-icons/lib/fa/caret-right'

class DoContent extends Component {
	render () {
		return (
			<section className="pillar-section semi-transparent-box">
				<h3>Our Pillars</h3>
				<p className="pillar-summary">
					We are building a welcoming creative space for people to find purpose in their
					lives through a social network that enables them to share great ideas with
					others with common interests, and collaborate on projects that
					they believe in. Purposeful stands on three main pillars: Ideas,
					Mentorship, and Interactions.
				</p>
				<section className="pillar-container">
					<p className="pillar">
						<h4> <b> Ideas </b><FaCaretRight/></h4>
						will give users the opportunity to develop cross-disciplinary projects
						that are truly meaningful to them. Users will have the opportunity to
						create a project if they have an idea, or join a project if they
						simply want to get involved.
					</p>
					<p className="pillar">
						<h4> <b> Mentorship </b><FaCaretRight/></h4>
						will enable users to find mentors and mentor others in the disciplines
						that they care about by providing general advice to their mentees. Any
						given user can become both a mentor (in something they know about) and
						a mentee (in something they want to learn about).
	        		</p>
					<p className="pillar">
						<h4><b> Interactions </b><FaCaretRight/></h4> Purposeful will strive to create worthwhile interactions
						between users both on the online application and in the physical world.
						Online we will provide chat session as well as the two pillars above.
						Physically we will set up office space(s) where people can collaborate
						and engage beyond the virtual world.
					</p>
				</section>
				<p className="pillar-summary">
					By connecting people who share common goals, we will provide a
					launchpad to turn our user’s dreams and aspirations into real actions,
					and to enable them to find and nurture the greatness in themselves by
					sharing their skills and collaborating with others along the way.
				</p>
			</section>
		);
	}
}

export default DoContent;
