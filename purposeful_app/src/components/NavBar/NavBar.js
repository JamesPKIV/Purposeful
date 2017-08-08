import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

  render() {
	return (
		<nav>
		  <ul>
		    <li><NavLink to="/mailingList" className="hvr-sweep-to-top" >Subscribe</NavLink></li>
		    <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
		    <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
		    <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
		  </ul>
	  </nav>
	);
  }
}

export default NavBar;
