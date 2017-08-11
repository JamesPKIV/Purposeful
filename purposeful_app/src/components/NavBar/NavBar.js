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
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    if (this.props.containerWidth >= 700){
      this.showNav();
    } else {
      this.hideNav();
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



  navBarDesktop() {
    return (
      <nav className="NavBar">
        <ul>
          <li><NavLink to="/mailingList" className="hvr-sweep-to-top" >Subscribe</NavLink></li>
          <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
          <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
          <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
        </ul>
      </nav>
    )
  }

  navBarMobile() {
    return (
      <nav className="NavBar">
        <ul>
          <button className="toggleBtn open" onClick={this.hideNav} >
            <li><NavLink to="/mailingList" className="hvr-sweep-to-top" >Subscribe</NavLink></li>
            <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
            <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
            <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
          </button>
          <button className="toggleBtn closed" onClick={this.toggle.bind(this)}>
            <FaClose />
          </button>
        </ul>
      </nav>
    )
  }

  render() {
      /* desktop version */
      if (this.props.containerWidth >= 700){
      return this.navBarDesktop();
      }
      /* mobile version */
      else {
        if (this.state.activeNav){
            return this.navBarMobile();
          } else {
            return (
              <button className="toggleBtn closed" onClick={this.toggle.bind(this)}>
                <FaAlignJustify />
              </button>
          );
          }
    }
  }
}

export default NavBar;
