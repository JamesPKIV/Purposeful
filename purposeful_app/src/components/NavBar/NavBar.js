import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import FaClose from 'react-icons/lib/fa/close';

class NavBar extends Component {

  constructor() {
    super();
    this.state = {activeNav: true};
    this.navBarDesktop = this.navBarDesktop.bind(this);
    this.navBarMobile = this.navBarMobile.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    if (this.props.containerWidth <= 700) {
      this.toggle();
    }
  }

  showNav() {
      this.setState({
        activeNav: true
      });
  }

   hideNav() {
      this.setState({
        activeNav: false
      });
  }

  toggle() {
        this.setState ({
          activeNav : !this.state.activeNav
        });
  }

  handleAlways(){
    this.setState({
      isFormShowing: true,
    });
  }

  navBarDesktop() {
    return (
        <ul>
          <li><NavLink to="/mailingList" className="hvr-sweep-to-top" >Subscribe</NavLink></li>
          <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
          <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
          <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
        </ul>
    )
  }

  navBarMobile() {
    if (this.state.activeNav){      
        return (
          <ul>
            <button className="menuBtn open" onClick={this.toggle} >
              <li><NavLink to="/mailingList" className="hvr-sweep-to-top" >Subscribe</NavLink></li>
              <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
              <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
              <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
            </button>
            <button className="toggleBtn open" onClick={this.toggle}>
              <FaClose />
            </button>
          </ul>
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
      return (
        <nav className="NavBar">
        {
          
          (this.props.containerWidth >= 700) ?
            this.navBarDesktop() :/* desktop version */
            this.navBarMobile()  /*mobile version */          
        }
        </nav>
      )
  }
}

export default NavBar;
