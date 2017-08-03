import React, { Component } from 'react';
import FaCaretRight from 'react-icons/lib/fa/caret-right'
class DoContent extends Component {
	render () {
		return (
			<section>
				<h3>Our Mission Statement</h3>
				<p id="content">
					At Purposeful, we strive to materialize our vision by building a
					welcoming and creative space for people to find purpose in their own
					lives through a social network that enables them to connect with
					others who share their interests, and collaborate on projects that
					they believe in. Purposeful, stands on two main pillars: the ideas
					pillar, and the mentorship pillar, as well as an interactions bridge.
				</p>
				<p id = "content">
					<FaCaretRight/> <b> The ideas pillar </b>
					will give users the opportunity to develop cross-disciplinary projects
					that are truly meaningful to them. Users will have the opportunity to
					create a project if they have an idea, or join a project if they
					simply want to get involved.
				</p>
				<p id = "content">
					<FaCaretRight/> <b> The mentorship pillar </b>
					will enable users to find mentors and mentor others in the disciplines
					that they care about by providing general advice to their mentees. Any
					given user can become both a mentor (in something they know about) and
					a mentee (in something they want to learn about).
        </p>
				<p id = "content">
					<FaCaretRight/> <b> The interactions bridge:</b> Purposeful will strive to create worthwhile interactions
					between users both on the online application and in the physical world.
					Online we will provide chat session as well as the two pillars above.
					Physically we will set up office space(s) where people can collaborate
					and engage beyond the virtual world.
				</p>
				<p id = "content">
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
