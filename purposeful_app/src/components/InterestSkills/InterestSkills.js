import React, { Component } from 'react';
import './InterestSkills.css';

class InterestSkills extends Component {

  constructor() {
    super();
    this.state = {interests: true};
    this.InterestSkillsDesktop = this.InterestSkillsDesktop.bind(this);
    this.pullCategories = this.pullCategories.bind(this);
  }

  pullCategories(){
    return(
      <div className="row">
        <div className="row">
          <div className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l1">
            <p> Technology </p>
          </div>
          <div className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l2">
            <p> Food </p>
          </div>
          <div className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l3">
            <p> Music </p>
          </div>
          <div className="light-green lighten-3 category z-depth-3 col s2 m2 l2 push-l4">
            <p> Travel </p>
          </div>
        </div>
        <div className="row">
          <div className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l1">
            <p> Dance </p>
          </div>
          <div className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l2">
            <p> Fitness </p>
          </div>
          <div className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l3">
            <p> Chemistry </p>
          </div>
          <div className="light-green lighten-2 z-depth-3 category col s2 m2 l2 push-l4">
            <p> Physics </p>
          </div>
        </div>
        <div className="row">
          <div className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l1">
            <p> Mathematics </p>
          </div>
          <div className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l2">
            <p> Cars </p>
          </div>
          <div className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l3">
            <p> Literature </p>
          </div>
          <div className="light-green lighten-1 z-depth-3 category col s2 m2 l2 push-l4">
            <p> Movies </p>
          </div>
        </div>
        <div className="row">
          <div className="light-green z-depth-3 category col s2 m2 l2 push-l1">
            <p> Education </p>
          </div>
          <div className="light-green z-depth-3 category col s2 m2 l2 push-l2">
            <p> Psichology </p>
          </div>
          <div className="light-green z-depth-3 category col s2 m2 l2 push-l3">
            <p> Architecture </p>
          </div>
          <div className="light-green z-depth-3 category col s2 m2 l2 push-l4">
            <p> Plants </p>
          </div>
        </div>
      </div>
    );
  }

  InterestSkillsDesktop(){
    return(
      <div className="container">
        <div className="row">
          <h2> Tell Us Your Interests </h2>
        </div>
        {this.pullCategories()}
        <div className="row">
          <button className="col s5 m5 l5 push-l4 btn-large light-green darken-1 disabled"> Continue </button>
        </div>
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
