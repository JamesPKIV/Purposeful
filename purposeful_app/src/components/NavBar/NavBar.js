import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import logo from '../App/logo.png';

class NavBar extends Component {

  constructor() {
    super();
    this.state = {activeNav: true};
    this.navBarDesktop = this.navBarDesktop.bind(this);
    this.navBarMobile = this.navBarMobile.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  componentWillMount() {
    if (this.props.containerWidth <= 700) {
      this.toggle();
    }
  }

   handleMenuSelection() {
      this.toggle();
  }

  toggle() {
        this.setState ({
          activeNav : !this.state.activeNav
        });
  }

  navBarDesktop() {
    return (
      <nav className="NavBar">
        <ul>
          <li><NavLink to="/home" className="hvr-sweep-to-top navEntry">Home </NavLink></li>
          <li><NavLink to="/mentorship" className="hvr-sweep-to-top navEntry">Mentorship </NavLink></li>
          <li><img src={logo} className="logo" alt="Purposeful"></img></li>
          <li><NavLink to="/profile" className="hvr-sweep-to-top navEntry">Profile </NavLink></li>
          <li className="learnBtn"><NavLink to="/login" className="learnLink">Sign Up</NavLink></li>       
        </ul>
      </nav>  
    )
  }

  navBarMobile() {
    if (this.state.activeNav){      
        return (
            <div className="NavBar-open">
              <button className="toggleBtn closed" onClick={this.toggle}>
                <div id="toggleBtn-inner">
                  <FaAlignJustify />
                </div>
              </button>
              <nav className="NavBar">
                <ul>
                  <button className="menuBtn open" onClick={this.handleMenuSelection} >
                    <li><NavLink to="/home" className="hvr-sweep-to-top navEntry">Home </NavLink></li>
                    <li><NavLink to="/mentorship" className="hvr-sweep-to-top navEntry">Mentorship </NavLink></li>
                    <li><NavLink to="/profile" className="hvr-sweep-to-top navEntry">Profile </NavLink></li>
                  </button>
                </ul>
              </nav>
            </div>
        )
    } 
    else {
        return (
          <button className="toggleBtn closed" onClick={this.toggle}>
            <div id="toggleBtn-inner">
              <FaAlignJustify />
            </div>
          </button>
        );  
    }
  }

  render() {
      return (this.props.containerWidth >= 700) ?
          this.navBarDesktop() :/* desktop version */
          this.navBarMobile();  /*mobile version */
  }
}

export default NavBar;
