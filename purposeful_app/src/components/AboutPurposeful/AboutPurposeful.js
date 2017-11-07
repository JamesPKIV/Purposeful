import React, { Component } from 'react';
import './AboutPurposeful.css';
import NavBar from '../NavBar/NavBar';
//importing images
import interactionsImg from './interactions.jpg';
import mentorImg from './mentorship.jpg';
import teamImg from './teamwork.jpg';

class AboutPurposeful extends Component {

	constructor() {
		super();
		this.state = {
			/*add state variables here*/
		};
		/*bind functions here*/
	}

  Desktop(){
		var apos = "'"
    return(
			<span>
				<NavBar />

				<div className="main-content container">

					<div className="row">
						<div className="col s12 m12 l12">
							<h4 className="col s12 m4 l4 push-l4">Finding Purpose</h4>
						</div>
					</div>

					<div className="row">
						<p className="pillar-summary">
							We are building a creative space for people to find purpose in their
							lives through collaborating with others on projects that
							they believe in. By connecting people around common goals, Purposeful will be a
							launchpad to turn ideas, dreams, and aspirations into reality.
						 	Purposeful stands on three main pillars:
						</p>
					</div>

					<div className="row">
						<div className="col s12 m4 l4">
							<div className="pillar">
								<h4><span id="ideas-color0" className="title"> Ideas </span></h4>
								<img src={interactionsImg} alt=""/>
								<p className="pillar-desc">Share your idea with the world and collaborate with others to start a project
								that is important to you, or discover and join a project that ignites your passion.</p>
							</div>
						</div>
						<div className="col s12 m4 l4">
							<div className="pillar">
								<h4><span id="ideas-color1" className="title"> Mentorship </span></h4>
								<img src={mentorImg} alt=""/>
								<p className="pillar-desc">Find a mentor to guide you through learning a new skill that interests you, or give back by sharing your knowledge and expertise through teaching others.</p>
							</div>
						</div>
						<div className="col s12 m4 l4">
							<div className="pillar">
								<h4><span id="ideas-color2" className="title"> Interactions </span></h4>
								<img src={teamImg} alt=""/>
								<p className="pillar-desc">Come together with people who share your interests to see what you can create.
								We{apos}re also working to set up office spaces where people can
								collaborate beyond the digital world.</p>
							</div>
						</div>
					</div>
				</div>
		</span>
    );
  }

  render() {
		return(
			this.Desktop()
		);
	}
}

export default AboutPurposeful;
