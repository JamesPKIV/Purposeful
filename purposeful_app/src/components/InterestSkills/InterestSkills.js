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
      chosen_skills: [],
      categories: ["Technology","Music","Food","Travel","Dance",
                   "Fitness","Chemistry","Physics","Mathematics",
                   "Cars","Literature","Movies","Education","Psychology",
                    "Architecture","Plants", "Fashion", "Health"]
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
    e.currentTarget.className = some;
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
    var num_rows = Math.floor(num_categories / 4);
    var extra_row = num_categories % 4;
    var class_name = "light-green hoverable category z-depth-2 col s2 m2 l2";
    var disabled_class_name = "blue-grey category z-depth-1 col s2 m2 l2";
    var actual_class_name = "";
    var extra_class = "";
    var lighten = "";
    var push = "";
    var i;
    let return_code = null;
    for(i = 0; i < num_rows; i++){
      lighten = this.get_lighten(i);
      var j;
      var return_inside = null;
      for(j = 0; j < 4; j++){
        push = this.get_push(j);
        extra_class = lighten + push;
        var categ = this.state.categories[(i*4)+j];
        actual_class_name = class_name + extra_class;
        let boundClick = this.chosen.bind(this, disabled_class_name + extra_class);
        var the_id = "";
        if(this.state.interests){
          the_id = "i" + categ;
        } else {
          the_id = "s" + categ;
        }
        return_inside =
          <span>
            {return_inside}
            <a id={the_id} onClick={boundClick} className={actual_class_name}>
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
        var pu = this.get_push(k);
        var extra = light + pu;
        var a_cl_name = "";
        var ca = this.state.categories[(i*4)+k];
        a_cl_name = class_name + extra;
        let boundClick = this.chosen.bind(this, disabled_class_name + extra);
        return_inside =
        <span>
          {return_inside}
          <a id={ca} onClick={boundClick} className={a_cl_name}>
            <p>{ca}</p>
          </a>
        </span>;
      }
      return_code=<span>{return_code}<div className="row">{return_inside}</div></span>;
    }
    return(
      <div className="row">
        {return_code}
      </div>
    );
  }

  continue_from(where){
    if(where === "interests"){
      this.toggle("interests");
      this.toggle("continue");
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
