import React, { Component } from 'react';
import './ContactContent.css';
import diana from './diana_pic.jpg';

class ContactContent extends Component {

	render () {
		return (
			<section>
				<h3>Who we are</h3>
				<p id = "content">
					We are a group of friends who met at the University of California,
					Santa Cruz. We all majored in Computer Science and were affiliated
					 with College Ten, which has the theme of Social Justice and Community.
				</p>
				<div id = "whoEntry">
					<p id= "two">
						Oscar picture would go here
					</p>
					<div id = "one">
						<p>
							<b> Oscar Parra:</b> oscar@bepurposeful.co
						</p>
						<p>
							Oscar ...
						</p>
					</div>
				</div>
				<div id = "whoEntry">
					<p id= "two">
						James picture would go here
					</p>
					<div id = "one">
						<p>
							<b> James Kennedy:</b> james@bepurposeful.co
						</p>
						<p>
							James ...
						</p>
					</div>
				</div>
				<div id = "whoEntry">
					<img src={diana} className="Diana_pic" alt="Picture of Diana"/>
					<div id = "one">
						<p>
							<b> Diana Gonzalez Santillan:</b> diana@bepurposeful.co
						</p>
						<p>
							Diana just graduated from College Ten with a major in Computer Science,
							a minor in Mathematics, and the College Ten Service Award. Ever since
							she was in high school she has been passionate about defending human
							rights and also about learning the wonders of computer science. She
							believes that access to education and mentorship, as well as providing
							opportunities to develop meaningful and interdisciplinary projects will
							take us closer to a more fair and tolerant world.
						</p>
					</div>
				</div>

			</section>
		);
	}
}

export default ContactContent;
