import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

  render() {
	return (
		<nav>
		  <ul>
		    <li><NavLink to="/mailingList">Mailing List</NavLink></li>
		    <li><NavLink to="/whatWeBelieve">What We Believe</NavLink></li>
		    <li><NavLink to="/whatWeDo">What We Do</NavLink></li>
		    <li><NavLink to="/contact">Contact Us</NavLink></li>
		  </ul>
	  </nav>
	);
  }
}

export default NavBar;
