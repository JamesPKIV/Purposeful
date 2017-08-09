import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaAlignJustify from 'react-icons/lib/fa/align-justify'

class NavBar extends Component {

  constructor() {
  	super();
  	this.state = {activeNav: true};
  	this.navBarCode = this.navBarCode.bind(this);
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



  navBarCode() {
    return (
  		<nav>
  		  <ul>
  		  	<li className="toggleBtn"><button onClick={this.toggle.bind(this)}> <FaAlignJustify /> </button></li>
  		    <li><NavLink to="/mailingList" className="hvr-sweep-to-top" >Subscribe</NavLink></li>
  		    <li><NavLink to="/whatWeBelieve" className="hvr-sweep-to-top">Our Story </NavLink></li>
  		    <li><NavLink to="/whatWeDo" className="hvr-sweep-to-top">Our Pillars </NavLink></li>
  		    <li><NavLink to="/contact" className="hvr-sweep-to-top">About us </NavLink></li>
  		  </ul>
  	  </nav>
  	)
  }

  render() {
  	/* desktop version */
    if (this.props.containerWidth >= 700){
		return this.navBarCode();
    } 
    /* mobile version */
    else {
       if (this.state.activeNav){
       		return this.navBarCode();
      	} else {
      		return (
      			<ul><li className="toggleBtn"><button onClick={this.toggle.bind(this)}> <FaAlignJustify /> </button></li></ul>
		  	);
      	}
	}
  }
}

export default NavBar;
