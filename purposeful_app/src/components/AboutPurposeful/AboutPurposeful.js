import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AboutPurposeful.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";
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
			<div>
			<NavBar />
			<section className="pillar-section semi-transparent-box main-content-about">
			<h4>Finding Purpose</h4>
			<p className="pillar-summary">
				We are building a creative space for people to find purpose in their
				lives through collaborating with others on projects that
				they believe in. By connecting people around common goals, Purposeful will be a
				launchpad to turn ideas, dreams, and aspirations into reality.
				 Purposeful stands on three main pillars:
			</p>
			<section className="pillar-container">
				<div className="pillar">
					<h4><span id="ideas-color0"> Ideas </span></h4>
					<img src={interactionsImg} alt=""/>
					<p className="pillar-desc">Share your idea with the world and collaborate with others to start a project
					that is important to you, or discover and join a project that ignites your passion.</p>
				</div>
				<div className="pillar">
					<h4><span id="ideas-color1"> Mentorship </span></h4>
					<img src={mentorImg} alt=""/>
					<p className="pillar-desc">Find a mentor to guide you through learning a new skill that interests you, or give back by sharing your knowledge and expertise through teaching others.</p>
						</div>
				<div className="pillar">
					<h4><span id="ideas-color2"> Interactions </span></h4>
					<img src={teamImg} alt=""/>
					<p className="pillar-desc">Come together with people who share your interests to see what you can create.
					We{apos}re also working to set up office spaces where people can
					collaborate beyond the digital world.</p>
				</div>
			</section>
		</section>
		</div>
    );
  }

  Mobile(){
    return(
      <span>
				<NavBar/>
				<div>
					<img src={working} alt="working" width="100vw" className="row center"/>
					<p className="row"> We are hard at work to tell you more about us soon! </p>
					<Link to="/landing" className="center btn light-green row">Back to Landing Page </Link>
				</div>
			</span>
    );
  }

  render() {
		if(window.innerWidth > 700){
			return(
				this.Desktop()
			);
		} else {
			return(
				this.Mobile()
			);
		}
	}
}

export default AboutPurposeful;
