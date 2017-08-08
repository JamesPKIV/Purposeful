import React, { Component } from 'react';
import './ContactContent.css';

// importing icons
import Linkedin from 'react-icons/lib/fa/linkedin-square';
import Github from 'react-icons/lib/fa/github';

// importing images 
import oscar from './oscar.png';
import james from './james2.jpg';
import diana from './diana.jpg';
// https://github.com/JamesPKIV
// https://github.com/digonsan



class ContactContent extends Component {
	render () {
		return (
			<div className="div-about">
				<h2 className="hd-leader">Purposeful Leadership</h2>
				<ul className="ul-about">
					<li>
						<figure>
							<img className="about-pic" src={oscar}/> 
							<figcaption className="about">
								<span className="name"> Oscar Parra </span> <br/>
								<span className="role-desc">Co-Founder &  Project Lead </span>
								<br/>
								<Github src="https://github.com/ogparra" className="icon" />
								<Linkedin src="https://www.linkedin.com/in/ogparra/" className="icon" />
							</figcaption>
						</figure>
					</li>
					<li>
						<figure>
							<img className="about-pic" src={james}/> 
							<figcaption className="about">
								<span className="name"> James Kennedy </span><br/>
								<span className="role-desc">Co-Founder &  Lead Software Engineer </span>
								<br/>
								<Github src="https://github.com/JamesPKIV" className="icon" />
								<Linkedin src="https://www.linkedin.com/in/jpkiv/" className="icon" />
							</figcaption>
						</figure>
					</li>
					<li>
						<figure>
							<img className="about-pic" src={diana}/> 
							<figcaption className="about">
								<span className="name"> Diana Gonzalez Santillan</span> <br/>
								<span className="role-desc">Co-Founder & Software Engineer </span>
								<br/>
								<Github src="https://github.com/digonsan" className="icon" />
								<Linkedin src="https://www.linkedin.com/in/diana-gonzalez-santillan-57739187/ " className="icon" />
							</figcaption>
						</figure>
					</li>
				</ul>
			</div>
		);
	}
}

export default ContactContent;
