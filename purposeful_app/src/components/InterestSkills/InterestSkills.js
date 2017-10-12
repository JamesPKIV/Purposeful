import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './InterestSkills.css';
import Client from "../../Client.js";
import working from "../App/still_working.png";

class InterestSkills extends Component {

	constructor() {
		super();
		this.state = {
			interests: true,
			continue: false,
			categories: [
				"Technology","Music","Food","Travel","Dance",
				"Fitness","Chemistry","Physics","Mathematics",
				"Cars","Literature","Movies","Education","Psichology",
				"Architecture","Plants", "Fashion", "Health" 
			],
			redirToHome: false,
		};
		this.InterestSkillsDesktop = this.InterestSkillsDesktop.bind(this);
		this.pullCategories = this.pullCategories.bind(this);
		this.chosen = this.chosen.bind(this);
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

	chosen(some, e){
		var the_id = e.currentTarget.id;
		var category = the_id.substr(1, the_id.length-1);
		document.getElementById(the_id).className = some;
		if(this.state.interests){
			this.props.handleAddInterest(category);
			if(this.props.interests.length === 3){
				this.toggle("continue");
			}
		} else {
			this.props.handleAddSkill(category);
			if(this.props.skills.length === 3){
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
		var num_cols = 4;
		var num_rows = Math.floor(num_categories / num_cols);
	var extra_row = num_categories % num_cols;
	var class_name = "light-green hoverable category z-depth-2 col s2 m2 l2";
	var disabled_class_name = "blue-grey grey-text category z-depth-1 col s2 m2 l2";
	var actual_class_name = "";
	var extra_class = "";
	var lighten = "";
	var push = "";
	var i;
	let return_code = null;
	for(i = 0; i <= num_rows; i++){
			if(i === num_rows){
				if(extra_row === 0){
					break;
				} else {
					num_cols = extra_row;
				}
			}
	  lighten = this.get_lighten(i);
	  var j;
	  var return_inside = null;
	  for(j = 0; j < num_cols; j++){
		push = this.get_push(j);
		extra_class = lighten + push;
		var categ = this.state.categories[(i*4)+j];
		actual_class_name = class_name + extra_class;
		let boundClick = this.chosen.bind(this, disabled_class_name + extra_class);
		var the_id = "";
		if(this.state.interests){
		  the_id = "i" + categ;
		  return_inside =
			<span>
			  {return_inside}
			  <a key={the_id} id={the_id} onClick={boundClick} className={actual_class_name}>
				<p>{categ}</p>
			  </a>
			</span>;
		} else {
		  the_id = "s" + categ;
		  return_inside =
			<span>
			  {return_inside}
			  <a key={the_id} id={the_id} onClick={boundClick} className={actual_class_name}>
				<p>{categ}</p>
			  </a>
			</span>;
		}
	  }
	  return_code=<span>{return_code}<div className="row">{return_inside}</div></span>;
	}
	return(
	  <div className="row">
		{return_code}
	  </div>
	);
  }

	/* advance to next section. if all sections are complete, send interests & skills
	* to the backend and navigate to the home page
	*/
	continue_from(where){
		if(where === "interests"){
			this.toggle("interests");
			this.toggle("continue");
			window.scrollTo(0,0);
		} else {

			this.props.handleSubmit()
				.then( () => {
					alert("Going to home now \n chosen_interests: " + this.props.interests
						+ "\n chosen_skills: "+ this.props.skills
					);
					/* programmatically navigate to home page, with state object user_profile */
					this.setState({
						redirToHome: true, 
					});
				})
				.catch( error => {
					alert("Error sending skills and iterests: " + JSON.stringify(error));
				});
		}
	}

	continue_button(){
		var apostrophe = "'";
		if(this.state.continue){
		  if(this.state.interests){
			return(
			  <div className="row valign-wrapper">
				<div className="col s5 m5 l5 valign">
				  <h4 className="row">Can{apostrophe}t find what you are looking for?</h4>
				  <h4 className="row">Create your own category!</h4>
				  <div className="row input-field">
					<input placeholder="New Category" id="new_categ" type="text" className="validate col s7 m7 l7"/>
					<button onClick={() => this.handleSubmit(document.getElementById("new_categ").value)} className="btn col s4 m4 l4 push-l1 light-green darken-1">
					  Add Category
					</button>
				  </div>
				</div>
				<button onClick={()=> this.continue_from("interests")} className="col s5 m5 l5 btn-large light-green darken-1 valign">
				  Continue
				</button>
			  </div>
			);
		  } else {
			return(
			  <div className="row valign-wrapper">
				<div className="col s5 m5 l5 valign">
				  <h4 className="row">Can{apostrophe}t find what you are looking for?</h4>
				  <h4 className="row">Create your own category!</h4>
				  <div className="row input-field">
					<input placeholder="New Category" id="new_categ" type="text" className="validate col s7 m7 l7"/>
					<button onClick={() => this.handleSubmit(document.getElementById("new_categ").value)} className="btn col s4 m4 l4 push-l1 light-green darken-1">
					  Add Category
					</button>
				  </div>
				</div>
				<span className="col s5 m5 l5 ">
				  <button onClick={()=> this.continue_from("skills")} className="col s12 m12 l12 btn-large light-green darken-1 valign">
									Continue
								</button>
				</span>
			  </div>
			);
		  }
		} else {
		  return(
			<div className="row valign-wrapper">
			  <div className="col s5 m5 l5 valign">
				<h4 className="row">Can{apostrophe}t find what you are looking for?</h4>
				<h4 className="row">Create your own category!</h4>
				<div className="row input-field">
				  <input placeholder="New Category" id="new_categ" type="text" className="validate col s7 m7 l7"/>
				  <button onClick={() => this.handleSubmit(document.getElementById("new_categ").value)} className="btn col s4 m4 l4 push-l1 light-green darken-1">
					Add Category
				  </button>
				</div>
			  </div>
			  <div className="col s5 m5 l5 valign">
				<span className="row">
				  <button className="col s12 m12 l12 btn-large light-green darken-1 disabled">
					Continue
				  </button>
				</span>
				<p className="row">HINT: Choose at least three categories</p>
			  </div>
			</div>
		  );
		}
	}

	handleSubmit(new_categ){
		this.state.categories.push(new_categ);
		var new_array = this.state.categories;
		this.setState({
		  categories: new_array
		});
	}

	interests_or_skills(){
		if(this.state.interests){
			return(
				<span>
		  <div className="row">
			<h2> Tell Us Your Interests </h2>
		  </div>
		  {this.pullCategories()}
		</span>
			);
		} else {
			return(
				<span>
		  <div className="row">
			<h2> Tell Us Your Skills </h2>
		  </div>
		  {this.pullCategories()}
		</span>
			);
		}
	}

	InterestSkillsDesktop(){
		return(
			<div className="container">
				{this.interests_or_skills()}
				{this.continue_button()}
			</div>
		);
	}

	InterestSkillsMobile(){
		return(
			<span>
				<img src={working} alt="working" width="100vw" className="row center"/>
				<p className="row"> We are hard at work to bring this component to your mobile soon! </p>
				<Link to="/landing" className="center btn light-green row">Back to Landing Page </Link>
			</span>
		);
	}

	render() {

		if (this.state.redirToHome) {
			return (
				<Redirect to="/home" />
			);
		}


		if(window.innerWidth > 700){
			return(
				this.InterestSkillsDesktop()
			);
		} else {
			return(
				this.InterestSkillsMobile()
			);
		}
	}
}

export default InterestSkills;
