import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o'
import FaGroup from 'react-icons/lib/fa/group'
import FaSunO from 'react-icons/lib/fa/sun-o'
import FaStarO from 'react-icons/lib/fa/star-o'

class NavBar extends Component {

  render() {
	return (
		<nav>
		  <ul>
		    <li><NavLink to="/mailingList">  <FaEnvelopeO/> Mailing List</NavLink></li>
		    <li><NavLink to="/whatWeBelieve"> <FaSunO/> What We Believe</NavLink></li>
		    <li><NavLink to="/whatWeDo"> <FaStarO/> What We Do</NavLink></li>
		    <li><NavLink to="/contact"> <FaGroup/> Who We Are and Contact</NavLink></li>
		  </ul>
	  </nav>
	);
  }
}

export default NavBar;
