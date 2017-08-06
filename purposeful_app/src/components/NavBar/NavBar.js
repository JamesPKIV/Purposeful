import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaGroup from 'react-icons/lib/fa/group';
import FaSunO from 'react-icons/lib/fa/sun-o';
import FaStarO from 'react-icons/lib/fa/star-o';

class NavBar extends Component {

  render() {
	return (
		<nav>
		  <ul>
		    <li><NavLink to="/mailingList">Mailing list <FaEnvelopeO className="icon"/> </NavLink></li>
		    <li><NavLink to="/whatWeBelieve">What We Believe <FaSunO className="icon"/> </NavLink></li>
		    <li><NavLink to="/whatWeDo">What We're Doing <FaStarO className="icon" /> </NavLink></li>
		    <li><NavLink to="/contact">Who We Are <FaGroup className="icon"/></NavLink></li>
		  </ul>
	  </nav>
	);
  }
}

export default NavBar;
