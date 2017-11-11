import React, { Component } from 'react';
import './OurTeam.css';
import NavBar from '../NavBar/NavBar';

// importing images
import oscar from './oscar.png';
import james from './james.png';
import diana from './diana.jpg';
import kevin from './kevin.png';
import partha from './partha.jpg';
import gretchen from './gretchen.png'

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
				<div className="container main-content">
					<div className="row">
						<div className="col s12 m12 l12">
							<h4>Our Team </h4>
						</div>
					</div>
					<div className="row">
						<div className="col s12 m4 l4">
							<div className="col s10 m8 l8 push-l2 push-s1">
								<img className="row about-pic" alt="Oscar Parra" src={oscar} />
								<span className="row name"> Oscar Parra </span>
								<span className="row role-desc">Co-Founder & Project Lead </span>
								<span className="row">
									<a href="https://github.com/ogparra"><Github className="icon"/></a>
									<a href="https://www.linkedin.com/in/ogparra/"><Linkedin className="icon" /></a>
								</span>
							</div>
						</div>

						<div className="col s12 m4 l4">
							<div className="col s10 m8 l8 push-l2 push-s1">
								<img className="row about-pic" alt="James Kennedy" src={james} />
								<span className="row name"> James Kennedy </span>
								<span className="row role-desc">Co-Founder & Lead Engineer </span>
								<span className="row">
									<a href="https://github.com/JamesPKIV"><Github className="icon"/></a>
									<a href="https://www.linkedin.com/in/jpkiv/"><Linkedin className="icon" /></a>
								</span>
							</div>
						</div>

						<div className="col s12 m4 l4">
							<div className="col s10 m8 l8 push-l2 push-s1">
								<img className="row about-pic" alt="Diana Gonzalez Santillan" src={diana} />
								<span className="row name-diana"> Diana Gonzalez Santillan </span>
								<span className="row role-desc">Co-Founder & Software Engineer </span>
								<span className="row">
									<a href="https://github.com/digonsan"><Github className="icon"/></a>
									<a href="https://www.linkedin.com/in/diana-gonzalez-santillan-57739187/"><Linkedin className="icon" /></a>
								</span>
							</div>
						</div>
					</div>
					<div className="row" onClick={this.toggle}>
						<div className="col s12 m2 l2 push-l5 chevron-div">
							<span>Board of Advisors</span>
							<br/>
							<span><ChevronUP className="icon" /></span>
						</div>
					</div>
				</div>
			</span>
		);
	}

	boardDesc(){
		return (
			<span>
				<NavBar/>

				<div className="container main-content">

					<span className="row">
						<div className="col s12 m12 l12">
							<h4>Board of Advisors</h4>
						</div>
					</span>

					<div className="row">

						<div className="col s12 m4 l4">
							<div className="col s10 m8 l8 push-l2 push-s1">
								<img className="row about-pic" alt="Partha Baral" src={partha} />
								<span className="row name"> Partha Baral </span>
								<span className="row role-desc">Senior Director at VMware </span>
								<span className="row">
									<a href="https://www.linkedin.com/in/parthabaral/"><Linkedin className="icon" /></a>
								</span>
							</div>
						</div>

						<div className="col s12 m4 l4">
							<div className="col s10 m8 l8 push-l2 push-s1">
								<img className="row about-pic" alt="Gretchen Andreasen" src={gretchen} />
								<span className="row name"> Gretchen Andreasen </span>
								<span className="row role-desc">Senior Director at UCSC CalTeach program </span>
								<span className="row">
									<a href=""><Linkedin className="icon" /></a>
								</span>
							</div>
						</div>

						<div className="col s12 m4 l4">
							<div className="col s10 m8 l8 push-s1 push-l2">
								<img className="row about-pic" alt="Kevin Jesse" src={kevin} />
								<span className="row name"> Kevin Jesse </span>
								<span className="row role-desc">Ph.D. Computer Science student at UC Davis </span>
								<span className="row">
									<a href="https://www.linkedin.com/in/kevinjesse/"><Linkedin className="icon" /></a>
								</span>
							</div>
						</div>
					</div>
					<div className="row" onClick={this.toggle}>
					  <div className="col s12 m2 l2 push-l5 chevron-div">
							<span>Our Team</span>
							<br/>
							<span><ChevronDOWN className="icon" /></span>
						</div>
					</div>
			  </div>
			</span>
		)
	}

	render() {
		window.scrollTo(0,0);
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
