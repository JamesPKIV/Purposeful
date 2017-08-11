import React, { Component } from 'react';
import './ContactContent.css';

// importing icons
import Linkedin from 'react-icons/lib/fa/linkedin-square';
import Github from 'react-icons/lib/fa/github';
import Chevron from 'react-icons/lib/fa/chevron-up';

// importing images 
import oscar from './oscar.png';
import james from './james2.jpg';
import diana from './diana.jpg';
import partha from './james3.jpg';
// https://github.com/JamesPKIV
// https://github.com/digonsan



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
		<div className="div-about">
			<h2 className="hd-leader">Purposeful Leadership</h2>
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
							<span className="role-desc">Co-Founder & Lead Software Engineer </span>
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
			<button onClick={this.showBoard}>
				<span><Chevron className="icon" /></span>
			</button>
		</div>
		)
	}
	
	boardDesc(){
		return (
			<div className="div-about">
			<h2 className="hd-leader">Purposeful Leadership</h2>
			<ul className="ul-about">
				<li>
					<figure className="whoEntry">
						<img className="about-pic" alt="Oscar Parra" src={partha} />
						<figcaption className="about">
							<span className="name"> James Kennedy </span> <br />
							<span className="role-desc"> Senior Director VmWare </span>
							<br />
							<a href="https://github.com/ogparra"><Github className="icon" /></a>
							<a href="https://www.linkedin.com/in/ogparra/"><Linkedin className="icon" /></a>
						</figcaption>
					</figure>
				</li>

			</ul>
			<button onClick={this.showTeam}>
				<span><Chevron className="icon" /></span>
			</button>
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
