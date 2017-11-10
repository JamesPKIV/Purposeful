import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './InterestSkills.css';

class InterestSkills extends Component {

	constructor() {
		super();
		this.state = {
			interests: true,
			continue: false,
			categories: [
				"Technology", "Music", "Food", "Travel", "Dance",
				"Fitness", "Chemistry", "Physics", "Mathematics",
				"Cars", "Literature", "Movies", "Education", "Psichology",
				"Architecture", "Plants", "Fashion", "Health", "Environment"
			],
			redirToHome: false,
		};
		this.pullCategories = this.pullCategories.bind(this);
		this.chosen = this.chosen.bind(this);
	}

	toggle(displaying) {
		if (displaying === "continue") {
			this.setState({
				continue: !this.state.continue
			});
		} else if(displaying === "interests") {
			this.setState({
				interests: !this.state.interests
			});
		}
	}

	// Adds the chosen category to the state attribute array
	// Sets the class name to disabled
	chosen(disabled, enabled, e) {
		var the_id = e.currentTarget.id;
		var category = the_id.substr(1, the_id.length - 1);
		if (this.state.interests) {
			if(this.props.interests.indexOf(category) >= 0){
				document.getElementById(the_id).className = enabled;
				this.props.handleDeleteInterest(category);
			} else {
				document.getElementById(the_id).className = disabled;
				this.props.handleAddInterest(category);
			}
			if (this.props.interests.length >= 3) {
				this.setState({
					continue: true
				});
			} else {
					this.setState({
						continue: false
					});
			}
		} else {
			if(this.props.skills.indexOf(category) >= 0){
				document.getElementById(the_id).className = enabled;
				this.props.handleDeleteSkill(category);
			} else {
				document.getElementById(the_id).className = disabled;
				this.props.handleAddSkill(category);
			}
			if (this.props.skills.length >= 3) {
				this.setState({
					continue: true
				});
			} else {
				this.setState({
					continue: false
				});
			}
		}
		console.log("interests: " + this.props.interests);
		console.log("skills: " + this.props.skills);
	}

	// lighten is a specific class in Google Materialize
	// for setting the shade of a specified color
	setShade(i) {
		var lighten = "";
		switch (i % 6) {
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

	// Push is a specific class in Google Materialize
	// for pushing columns
	setPush(j) {
		var push = "";
		switch (j % 4) {
			case 0:
				push = " push-l1 push-s1";
				break;
			case 1:
				push = " push-l2 push-s3";
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

	pullCategories(which) {
		var num_categories = this.state.categories.length;
		var num_cols;
		if(which === "desktop"){
			num_cols = 4;
		} else{
			num_cols = 2;
		}
		var num_rows = Math.floor(num_categories / num_cols);
		var extra_cols = num_categories % num_cols;
		var class_name = "light-green hoverable category z-depth-2 col s4 m2 l2";
		var disabled_class_name = "blue-grey grey-text category z-depth-1 col s4 m2 l2";
		var actual_class_name = "";
		var extra_class = "";
		var lighten = "";
		var push = "";
		let return_code = null;

		for (var i = 0; i <= num_rows; i++) {
			var num_cols_now = num_cols;
			if (i === num_rows) {
				if (extra_cols === 0) {
					break;
				} else {
					num_cols_now = extra_cols;
				}
			}
			lighten = this.setShade(i);
			var return_inside = null;
			for (var j = 0; j < num_cols_now; j++) {
				push = this.setPush(j);
				extra_class = lighten + push;
				var categ = this.state.categories[(i * num_cols) + j];
				actual_class_name = class_name + extra_class;
				let boundClick = this.chosen.bind(this, disabled_class_name + extra_class, actual_class_name);
				var the_id = "";
				if (this.state.interests) {
					the_id = "i" + categ;
					return_inside =
						<div>
								{return_inside}
							<a id={the_id} onClick={boundClick} className={actual_class_name}>
								<p>{categ}</p>
							</a>
						</div>
				} else {
					the_id = "s" + categ;
					return_inside =
						<span>
							{return_inside}
							<a id={the_id} onClick={boundClick} className={actual_class_name}>
								<p>{categ}</p>
							</a>
						</span>;
				}
			}
			return_code = <span>{return_code}<div className="row">{return_inside}</div></span>;
		}
		return (
			<div className="row main_area">
				{return_code}
			</div>
		);
	}

	/* advance to next section. if all sections are complete, send interests & skills
	* to the backend and navigate to the home page
	*/
	continueFrom(where) {
		if (where === "interests") {
			this.toggle("interests");
			this.toggle("continue");
			window.scrollTo(0, 0);
		} else {

			this.props.handleSubmit()
				.then(() => {
					alert("Going to home now \n chosen_interests: " + this.props.interests
						+ "\n chosen_skills: " + this.props.skills
					);
					/* programmatically navigate to home page, with state object user_profile */
					this.setState({
						redirToHome: true,
					});
				})
				.catch(error => {
					alert("Error sending skills and iterests: " + JSON.stringify(error));
				});
		}
	}

	// Adds category to the categories array
	addCategory(new_categ) {
		console.log('Add categories button clicked');
		this.state.categories.push(new_categ);
		var new_array = this.state.categories;
		this.setState({
			categories: new_array
		});
	}

	continueButton() {
		// if state for continue is set to true (show button active)
		// if user is in interests part, display active continue button for interests
		// else show skills active continue button
		if (this.state.continue) {
			if (this.state.interests) {
				return (
					<div className="row valign-wrapper">
						{/*<div className="col s5 m5 l5 valign">
							<h4 className="row">Create your own category!</h4>
							<div className="row input-field">
								<input placeholder="New Category" id="new_categ" type="text" className="validate col s7 m7 l7" />
								<button onClick={() => this.addCategory(document.getElementById("new_categ").value)} className="btn col s4 m4 l4 push-l1 light-green darken-1">
									Add Category
								</button>
							</div>
						</div> */}
						<button onClick={() => this.continueFrom("interests")} className="col s12 m5 l5 btn-large light-green darken-1 valign">
							Continue
						</button>
					</div>
				);
			} else {
				return (
					<div className="row valign-wrapper">
						{/*<div className="col s5 m5 l5 valign">
							<h4 className="row">Create your own category!</h4>
							<div className="row input-field">
								<input placeholder="New Category" id="new_categ" type="text" className="validate col s7 m7 l7" />
								<button onClick={() => this.addCategory(document.getElementById("new_categ").value)} className="btn col s4 m4 l4 push-l1 light-green darken-1">
									Add Category
								</button>
							</div>
						</div> */}
						<span className="col s12 m5 l5 ">
							<button onClick={() => this.continueFrom("skills")} className="col s12 m12 l12 btn-large light-green darken-1 valign">
								Continue
								</button>
						</span>
					</div>
				);
			}
		} else {
			// User has not selected 3 categories
			// Show button as disabled
			return (
				<div className="row valign-wrapper">
					{/*<div className="col s5 m5 l5 valign">
						<h4 className="row">Create your own category!</h4>
							<div className="row input-field">
								<input placeholder="New Category" id="new_categ" type="text" className="validate col s7 m7 l7" />
								<button onClick={() => this.addCategory(document.getElementById("new_categ").value)} className="btn col s4 m4 l4 push-l1 light-green darken-1">
									Add Category
								</button>
							</div>
						</div> */}
					<div className="col s12 m5 l5 valign">
					<p className="row"> Select at least three categories</p>
						<span className="row">
							<button className="col s12 m12 l12 btn-large light-green darken-1 disabled">
								Continue
				  		</button>
						</span>
					</div>
				</div>
			);
		}
	}

	interestsOrSkills(which) {
		if (this.state.interests) {
			return (
				<span>
					<div className="row">
						<h2> Tell Us Your Interests </h2>
					</div>
					{this.pullCategories(which)}
				</span>
			);
		} else {
			return (
				<span>
					<div className="row">
						<h2> Tell Us Your Skills </h2>
					</div>
					{this.pullCategories(which)}
				</span>
			);
		}
	}

	InterestSkillsBoth(which) {
		return (
			<div className="container">
				{this.interestsOrSkills(which)}
				{this.continueButton()}
			</div>
		);
	}

	render() {
		if (this.state.redirToHome) {
			return (
				<Redirect to="/home" />
			);
		}
		if (window.innerWidth > 700) {
			return (
				this.InterestSkillsBoth("desktop")
			);
		} else {
			return (
				this.InterestSkillsBoth("mobile")
			);
		}
	}
}

export default InterestSkills;
