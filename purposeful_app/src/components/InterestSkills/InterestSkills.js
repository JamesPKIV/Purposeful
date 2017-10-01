import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InterestSkills.css';

class InterestSkills extends Component {

  constructor() {
    super();
    this.state = {
      interests: true,
      continue: false,
      chosen_interests: [],
      chosen_skills: []
    };
    this.InterestSkillsDesktop = this.InterestSkillsDesktop.bind(this);
    this.pullCategories = this.pullCategories.bind(this);
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

  chosen(category){
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

  pullCategories(){
    return(
      <div className="row">
        <div className="row">
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
        </div>
      </div>
    );
  }

  continue_from(where){
    if(where === "interests"){
      this.toggle("interests");
      this.toggle("continue")
    } else {
      alert("Going to home now \n chosen_interests: "+ this.state.chosen_interests+"\n chosen_skills: "+this.state.chosen_skills);
    }
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
            <Link onClick={()=> this.continue_from("skills")} to={{"pathname":"/home"}}>
              <button  className="col s5 m5 l5 push-l4 btn-large light-green darken-1"> Continue </button>
            </Link>
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

export default InterestSkills;
