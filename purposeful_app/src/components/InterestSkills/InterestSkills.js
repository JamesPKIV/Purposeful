import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './InterestSkills.css';
import Client from "../../Client.js";

class InterestSkills extends Component {

	constructor() {
		super();
		this.state = {
			interests: true,
			continue: false,
			chosen_interests: [],
			chosen_skills: [],
			categories: ["Technology","Music","Food","Travel","Dance",
									 "Fitness","Chemistry","Physics","Mathematics",
									 "Cars","Literature","Movies","Education","Psichology",
										"Architecture","Plants" ]
		};
		this.InterestSkillsDesktop = this.InterestSkillsDesktop.bind(this);
		this.pullCategories = this.pullCategories.bind(this);
		this.chosen = this.chosen.bind(this);
	}


	/* once this component mounts, load any state data that was sent
	*  from the previous page
	*/ 
	componentDidMount () {
		var recieved_state = this.props.history.location.state;

		console.log("(InterestSkills.JS) componentDidMount state: ", recieved_state);
		if (recieved_state !== null) {
			this.setState( recieved_state );
			console.log ("InterestSkills.js) state recieved. New state: ", this.state);
		};
	}


	/* advance to next section. if all sections are complete, send interests & skills
	* to the backend and navigate to the home page 
	*/ 
	continue_from(where){
		if(where === "interests"){
			this.toggle("interests");
			this.toggle("continue");
		} else {
			
			var interests = this.state.chosen_interests;
			var skills = this.state.chosen_skills;
			var user_id = this.state.user_id;
			alert("Continuing... \n chosen_interests: " + interests 
						+ "\n chosen_skills: "+ skills
					);
			Client.add_skills_and_interests(user_id, skills, interests)
				.then( user_profile => {
					alert("Going to home now \n chosen_interests: " + interests 
						+ "\n chosen_skills: "+ skills
					);
					this.setState({
						skills: user_profile,
					});
					/* programmatically navigate to home page, with state object user_profile */
					this.props.history.push('/home', this.state);
				})
				.catch( error => {
					alert("Error sending skills and iterests: " + JSON.stringify(error)); 

				})
		}
	}


	toggle(to_toggle){
		if(to_toggle === "continue"){
			this.setState({
				continue: !this.state.continue
			});
		} else if (to_toggle === "interests"){
			this.setState({
				interests: !this.state.interests
			});
		}
	}

	chosen(e){
		var category = e.target.id;
		console.log(category + " is of type " + typeof(category));
		if(this.state.interests){
			this.state.chosen_interests.push(category);
			if(this.state.chosen_interests.length === 3){
				this.toggle("continue");
			}
		} else {
			this.state.chosen_skills.push(category);
			if(this.state.chosen_skills.length === 3){
				this.toggle("continue");
			}
		}
	}

	get_lighten(i){
		var lighten = "";
		switch(i % 6){
			case 0:
				lighten = " lighten-3";
				break;
			case 1:
				lighten = " lighten-2";
				break;
			case 2:
				lighten = " lighten-1";
				break;
			case 3:
				lighten = "";
				break;
			case 4:
				lighten = " lighten-1";
				break;
			case 5:
				lighten = " lighten-2";
				break;
			default:
				break;
		}
		return lighten;
	}

	get_push(j){
		var push = "";
		switch(j % 4){
			case 0:
				push = " push-l1";
				break;
			case 1:
				push = " push-l2";
				break;
			case 2:
				push = " push-l3";
				break;
			case 3:
				push = " push-l4";
				break;
			default:
				break;
		}
		return push;
	}

	pullCategories(){
		var num_categories = this.state.categories.length;
		var num_rows = num_categories / 4;
		var extra_row = num_categories % 4;
		var class_name = "light-green category z-depth-3 col s2 m2 l2";
		var actual_class_name = "";
		var lighten = "";
		var push = "";
		var i;
		let return_code = null;
		for(i = 0; i < num_rows; i++){
			lighten = this.get_lighten(i);
			var lighten_name = class_name + lighten;
			var j;
			var return_inside = null;
			for(j = 0; j < 4; j++){
				push = this.get_push(j);
				actual_class_name = lighten_name + push;
				var categ = this.state.categories[(i*4)+j];
				return_inside =
					<span>
						{return_inside}
						<a id={categ} onClick={this.chosen} className={actual_class_name}>
							<p>{categ}</p>
						</a>
					</span>;
			}
			return_code=<span>{return_code}<div className="row">{return_inside}</div></span>;
		}
		if(extra_row > 0){
			var k;
			var light = this.get_lighten(i);
			return_inside = null;
			for(k = 0; k < extra_row; k++){
				console.log(extra_row);
				var pu = this.get_push(k);
				var a_cl_name = class_name + light + pu;
				var ca = this.state.categories[(i*4)+k];
				return_inside =
				<span>
					{return_inside}
					<a id={ca} onClick={this.chosen} className={a_cl_name}>
						<p>{ca}</p>
					</a>
				</span>;
			}
			return_code=<span>{return_code}<div className="row">{return_inside}</div></span>;
		}


		return(
			<div className="row">
				{return_code}
			{/*  <div className="row">
					<a onClick={()=>this.chosen("Technology")} className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l1">
						<p> Technology </p>
					</a>
					<a onClick={()=>this.chosen("Food")} className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l2">
						<p> Food </p>
					</a>
					<a onClick={()=>this.chosen("Music")} className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l3">
						<p> Music </p>
					</a>
					<a onClick={()=>this.chosen("Travel")} className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l4">
						<p> Travel </p>
					</a>
				</div>
				<div className="row">
					<a onClick={()=>this.chosen("Dance")} className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l1">
						<p> Dance </p>
					</a>
					<a onClick={()=>this.chosen("Fitness")} className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l2">
						<p> Fitness </p>
					</a>
					<a onClick={()=>this.chosen("Chemistry")} className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l3">
						<p> Chemistry </p>
					</a>
					<a onClick={()=>this.chosen("Physics")} className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l4">
						<p> Physics </p>
					</a>
				</div>
				<div className="row">
					<a onClick={()=>this.chosen("Mathematics")} className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l1">
						<p> Mathematics </p>
					</a>
					<a onClick={()=>this.chosen("Cars")} className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l2">
						<p> Cars </p>
					</a>
					<a onClick={()=>this.chosen("Literature")} className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l3">
						<p> Literature </p>
					</a>
					<a onClick={()=>this.chosen("Movies")} className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l4">
						<p> Movies </p>
					</a>
				</div>
				<div className="row">
					<a onClick={()=>this.chosen("Education")} className="light-green z-depth-3 category col s2 m2 l2 push-l1">
						<p> Education </p>
					</a>
					<a onClick={()=>this.chosen("Psichology")} className="light-green z-depth-3 category col s2 m2 l2 push-l2">
						<p > Psichology </p>
					</a>
					<a onClick={()=>this.chosen("Architecture")} className="light-green z-depth-3 category col s2 m2 l2 push-l3">
						<p> Architecture </p>
					</a>
					<a onClick={()=>this.chosen("Plants")} className="light-green z-depth-3 category col s2 m2 l2 push-l4">
						<p> Plants </p>
					</a>
				</div>*/}
			</div>
		);
	}


	continue_button(){
		if(this.state.continue){
			if(this.state.interests){
				return(
					<div className="row">
						<button onClick={()=> this.continue_from("interests")} className="col s5 m5 l5 push-l4 btn-large light-green darken-1"> Continue </button>
					</div>
				);
			} else {
				return(
					<div className="row">
						<button  className="col s5 m5 l5 push-l4 btn-large light-green darken-1"
							onClick={() => this.continue_from("skills")}>
								Continue
						</button>
					</div>
				);
			}
		} else {
			return(
				<div className="row">
					<button className="col s5 m5 l5 push-l4 btn-large light-green darken-1 disabled"> Continue </button>
				</div>
			);
		}
	}

	interests_or_skills(){
		if(this.state.interests){
			return(
				<div className="row">
					<h2> Tell Us Your Interests </h2>
				</div>
			);
		} else {
			return(
				<div className="row">
					<h2> Tell Us Your Skills </h2>
				</div>
			);
		}
	}

	InterestSkillsDesktop(){
		return(
			<div className="container">
				{this.interests_or_skills()}
				{this.pullCategories()}
				{this.continue_button()}
			</div>
		);
	}

	InterestSkillsMobile(){
		return(
			<h1> This is a placeholder for the mobile version </h1>
		);
	}

	render() {
		return (
			this.InterestSkillsDesktop()
		);
	}
}

export default withRouter(InterestSkills);
