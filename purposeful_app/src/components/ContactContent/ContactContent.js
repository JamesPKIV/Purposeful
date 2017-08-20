import React, { Component } from 'react';
import './ContactContent.css';

// importing icons
import Linkedin from 'react-icons/lib/fa/linkedin-square';
import Github from 'react-icons/lib/fa/github';
import ChevronUP from 'react-icons/lib/fa/chevron-up';
import ChevronDOWN from 'react-icons/lib/fa/chevron-down';
// importing images 
import oscar from './oscar.png';
import james from './james3.png';
import diana from './diana.jpg';
import partha from './partha-baral.jpg';
import kevin from './kevin-jesse.jpg';

class ContactContent extends Component {

	constructor() {
		super();
		this.state = {activeDesc: true};
		this.showTeam = this.showTeam.bind(this);
		this.showBoard = this.showBoard.bind(this);
		this.teamDesc = this.teamDesc.bind(this);
		this.boardDesc = this.boardDesc.bind(this);
	}

	componentWillMount(){
		this.showTeam();
	}

	showTeam(){
		this.setState({
			activeDesc : true
		});
	}

	showBoard(){
		this.setState({
			activeDesc: false
		});
	}

	teamDesc() {
		return (
		<div className="div-about semi-transparent-box">
			<h2 className="hd-leader">Our Team</h2>
			<ul className="ul-about">
				<li>
					<figure className="whoEntry">
						<img className="about-pic" alt="Oscar Parra" src={oscar} />
						<figcaption className="about">
							<span className="name"> Oscar Parra </span> <br />
							<span className="role-desc">Co-Founder & Project Lead </span>
							<br />
							<a href="https://github.com/ogparra"><Github className="icon" /></a>
							<a href="https://www.linkedin.com/in/ogparra/"><Linkedin className="icon" /></a>
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
			<div className="chevron-div" onClick={this.showBoard}>
				<span>Board of Advisors</span>
				<br/>
				<span><ChevronDOWN className="icon " /></span>
			</div>
		</div>
		)
	}
	
	boardDesc(){
		return (
			<div className="div-about semi-transparent-box">
			<h2 className="hd-leader">Board of Advisors</h2>
			<ul className="ul-about">
				<li>
					<figure className="whoEntry">
						<img className="about-pic" alt="Partha Baral" src={partha} />
						<figcaption className="about">
							<span className="name"> Partha Baral </span> <br />
							<span className="role-desc"> Senior Director VmWare </span>
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
			<div className="chevron-div" onClick={this.showTeam}> 
				<span>Our Team</span>
				<br/>
				<span><ChevronUP className="icon " /></span>
			</div>
		</div>
		)
	}

	render() {
		if(this.state.activeDesc){
			return this.teamDesc();
		}else if(!this.state.activeDesc){
			return this.boardDesc();
		}
	}
}

export default ContactContent;
