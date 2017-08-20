import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import FaClose from 'react-icons/lib/fa/close';
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
      this.props.onClick();
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
          <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top navEntry">Our Story </NavLink></li>
          <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top navEntry">Our Pillars </NavLink></li>
          <li><img src={logo} className="logo" alt="Purposeful"></img></li>
          <li><NavLink to="/contact" className="hvr-sweep-to-top navEntry">About us </NavLink></li> 
          <li className="learnBtn"><NavLink to="/mailingList" className="learnLink">Learn More</NavLink></li>       
        </ul>

        
      </nav>  
    )
  }

  navBarMobile() {
    if (this.state.activeNav){      
        return (
          <nav className="NavBar">
            <ul>
              <button className="menuBtn open" onClick={this.handleMenuSelection} >
                <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
                <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
                <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
              </button>
              <button className="toggleBtn open" onClick={this.toggle}>
                <FaClose />
              </button>
            </ul>
          </nav>
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
