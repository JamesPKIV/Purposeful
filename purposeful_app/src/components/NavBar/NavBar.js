import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import FaSearch from 'react-icons/lib/fa/search';
import logo from '../App/logo.png';
import DropDown from '../DropDown/DropDown';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      activeNav: true, 
      searchInput: "",
     };
    this.navBarDesktop = this.navBarDesktop.bind(this);
    this.navBarMobile = this.navBarMobile.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  componentWillMount = () => {
    if (this.props.containerWidth <= 700) {
      this.toggle();
    }
  }

  handleMenuSelection = () => {
    this.toggle();
  }

  // update the value to be searched for
  handleUpdate = (e) => {
    this.setState({
			searchInput: e.target.value,
    });
  }

  // make the api call to the database with the search value input
  handleSearch = (e) =>{
    if(e.key == 'Enter'){
      alert(e.target.value +" the value of search input \nsend request to server" );
      // Make client.js call to search the database with value input
    }
  }

  toggle = () => {
    this.setState({
      activeNav: !this.state.activeNav
    });
  }

  navBarDesktop() {
    return (
      <nav className="NavBar">
        <ul>
          <li><img width="50" height="50" src={logo} className="plogo" alt="Purposeful"></img></li>

          <li><NavLink to="/home" className="hvr-sweep-to-top navEntry">Collaborations </NavLink></li>
          <li><NavLink to="/mentorship" className="hvr-sweep-to-top navEntry">Mentorship </NavLink></li>
          <li><NavLink to="/profile" className="hvr-sweep-to-top navEntry">Stories </NavLink></li>
          { /* Right side of navbar */}
          <li className="navRight"><DropDown/></li>
          <li className="navRight"><NavLink to="/profile" className="navEntry">Profile </NavLink></li>
          <li className="navRight"><div className="divSearch"><FaSearch className="FaSearchIcon" size={16} />  
            <input  className="searchInput" 
                    placeholder="Search"
                    onChange={this.handleUpdate} 
                    onKeyPress={this.handleSearch}
                />
            </div>
          </li>
        </ul>
      </nav>
    );
  }

  navBarMobile() {
    if (this.state.activeNav) {
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
    //console.log("CONSOLE LOG: " + window.location);
    return (this.navBarDesktop()); /* desktop version */
  }
}

export default NavBar;