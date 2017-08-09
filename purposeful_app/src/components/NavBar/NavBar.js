import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import globalClass from './global.js';

import FaAlignJustify from 'react-icons/lib/fa/align-justify'

class NavBar extends Component {

  navBarCode(){
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

  render() {
     var toRender = (<div/>);
     if (this.props.containerWidth >= 700){
       toRender = (<navBarCode />);
     } else {

       var renderIt = (<div/>);
console.log(globalClass.activeNav);
       if (globalClass.activeNav){
         console.log("isTrue");
         renderIt =(<navBarCode />);
       } else {
         console.log("isFalse");
         renderIt = (<div/>);
       }

      function toggle(){
        globalClass.activeNav = !globalClass.activeNav;
        this.forceUpdate();
      };
console.log(renderIt);
       toRender =(
         <div>
           <button onClick={toggle.bind(this)}>
             <FaAlignJustify />
           </button>
           <div> {renderIt} </div>
         </div>
       );
     }
	   return <div>{toRender}</div>;
  }
}

export default NavBar;
