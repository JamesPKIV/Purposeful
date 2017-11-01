import React, { Component } from 'react';
import './OurTeam.css';
import NavBar from '../NavBar/NavBar';

// importing images
import oscar from './oscar.png';
import james from './james.png';
import diana from './diana.jpg';
import kevin from './kevin.png';
import partha from './partha.jpg';

// importing React icons
import Github from 'react-icons/lib/fa/github';
import Linkedin from 'react-icons/lib/fa/linkedin';

import ChevronUP from 'react-icons/lib/fa/chevron-up';
import ChevronDOWN from 'react-icons/lib/fa/chevron-down';

class OurTeam extends Component {

	constructor() {
		super();
		this.state = {
			showTeam: true
		};
		/*bind functions here*/
		this.toggle = this.toggle.bind(this);
		this.teamDesc = this.teamDesc.bind(this);
		this.boardDesc = this.boardDesc.bind(this);
	}

	toggle(){
		this.setState({
			showTeam: !this.state.showTeam
		});
	}

	teamDesc() {
		return (
			<span>
				<NavBar />
				<div className="main-about">
						<h4>Our Team </h4>
						<ul className="ul-about">
							<li>
								<figure className="whoEntry">
									<img className="about-pic" alt="Oscar Parra" src={oscar} />
									<figcaption className="about">
										<span className="name"> Oscar Parra </span> <br />
										<span className="role-desc">Co-Founder & Project Lead </span>
										<br />
										<a href="https://github.com/ogparra"><Github className="icon"/></a>
										<a href="https://www.linkedin.com/in/ogparra/"><Linkedin className="icon" /></a>
										<android/>
									</figcaption>
								</figure>
							</li>
							<li>
								<figure className="whoEntry">
									<img className="about-pic" alt="James Kennedy" src={james} />
									<figcaption className="about">
										<span className="name"> James Kennedy </span><br />
										<span className="role-desc">Co-Founder & Lead Engineer </span>
										<br />
										<a href="https://github.com/JamesPKIV"><Github className="icon" /></a>
										<a href="https://www.linkedin.com/in/jpkiv/" ><Linkedin className="icon" /></a>
									</figcaption>
								</figure>
							</li>
							<li>
								<figure className="whoEntry">
									<img className="about-pic" alt="Diana Gonzalez Santillan" src={diana} />
									<figcaption className="about">
										<span className="name"> Diana Gonzalez Santillan</span> <br />
										<span className="role-desc">Co-Founder & Software Engineer </span>
										<br />
										<a href="https://github.com/digonsan"><Github className="icon" /></a>
										<a href="https://www.linkedin.com/in/diana-gonzalez-santillan-57739187/" ><Linkedin className="icon" /></a>
									</figcaption>
								</figure>
							</li>
						</ul>
					</div>
					<div className="chevron-div" onClick={this.toggle}>
							<span>Board of Advisors</span>
							<br/>
							<span><ChevronUP className="icon " /></span>
					</div>
			</span>
		);
	}

	boardDesc(){
		return (
			<span>
				<NavBar />
				<div className="main-about">
					<div>
					<h4 className="hd-leader">Board of Advisors</h4>
					<ul className="ul-about">
						<li>
							<figure className="whoEntry">
								<img className="about-pic" alt="Partha Baral" src={partha} />
								<figcaption className="about">
									<span className="name"> Partha Baral </span> <br />
									<span className="role-desc"> Senior Director at VMware </span>
									<br />
									<a href="https://www.linkedin.com/in/parthabaral/"><Linkedin className="icon" /></a>
								</figcaption>
							</figure>
						</li>
						<li>
							<figure className="whoEntry">
								<img className="about-pic" alt="Kevin Jesse" src={kevin} />
								<figcaption className="about">
									<span className="name"> Kevin Jesse </span> <br />
									<span className="role-desc"> Ph.D. CS at UC Davis </span>
									<br />
									<a href="https://www.linkedin.com/in/kevinjesse/"><Linkedin className="icon" /></a>
								</figcaption>
							</figure>
						</li>
					</ul>
					</div>
					<div className="chevron-div" onClick={this.toggle}>
						<span>Our Team</span>
						<br/>
						<span><ChevronDOWN className="icon " /></span>
					</div>
			</div>
			</span>
		)
	}

	render() {
		if (this.state.showTeam){
			return (
					this.teamDesc()
			);
		} else {
			return (
					this.boardDesc()
			);
		}
	}
}

export default OurTeam;
