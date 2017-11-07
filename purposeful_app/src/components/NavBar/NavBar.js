import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NavBar.css';
import FaSearch from 'react-icons/lib/fa/search';
import logo from '../App/logo.png';
import DropDown from './DropDown';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeNav: true,
      searchInput: "",
     };
    this.navBarDesktop = this.navBarDesktop.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  componentWillMount = () => {
    var recieved_state = this.props.history.location.state;
    if (recieved_state !== null) {
			this.setState( recieved_state );
		}

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
    if(e.key === 'Enter'){
      alert(e.target.value +" the value of search input \nsend request to server" );
      // Make client.js call to search the database with value input
    }
  }

  handleNav = (val) => {
    console.log(val + " was selected");
    console.log(this.props.history);
    this.props.history.push(val, this.props.history.location.state);
  }

  toggle = () => {
    this.setState({
      activeNav: !this.state.activeNav
    });
  }

  navBarDesktop() {
    return (
      <nav className="grey darken-4 bar">
        <div className="nav-wrapper row fullrow">
          <ul id="nav-left" className="left hide-on-med-and-down">
            <li><div onClick={() => this.handleNav("home")}><img className="navLogo" src={logo} alt="Purposeful"></img></div></li>
            <li><div onClick={() => this.handleNav("collabs")}  className="hvr-sweep-to-top navEntry">Collaborations </div></li>
            <li><div onClick={() => this.handleNav("mentorship")}  className="hvr-sweep-to-top navEntry">Mentorship </div></li>
            <li><div onClick={() => this.handleNav("stories")}  className="hvr-sweep-to-top navEntry">Stories </div></li>
            <li><div onClick={() => this.handleNav("/chat")} className="hvr-sweep-to-top navEntry">Messages </div></li>
            <li><div onClick={() => this.handleNav("/profile")} className="hvr-sweep-to-top navEntry" >Profile </div></li>
          </ul>
          <ul id="nav-right" className="right hide-on-med-and-down">
            <li><DropDown logout={this.props.logout}/></li>
            <li>
              <div><FaSearch className="searchIcon"/>
                <input className="searchInput"
                  placeholder="Search"
                  onChange={this.handleUpdate}
                  onKeyPress={this.handleSearch}
                />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  navBarMobile(){
    return(
      <div className="row grey darken-4 bar">
        <div className="col s2 mobile_col" onClick={() => this.handleNav("home")}>
          <img className="NavLogo" src={logo} alt="Purposeful"></img>
        </div>
        <div className="col s8 mobile_col valign-wrapper">
          <p className="title"> bePurposeful </p>
        </div>
        <div className="col s2 mobile_col">
          <DropDown logout={this.props.logout}/>
        </div>
      </div>
    );
  }

  render() {
		if(window.innerWidth >= 700){
			return(
				this.navBarDesktop()
			);
		} else {
			return(
				this.navBarMobile()
			);
		}
	}
}

export default withRouter(NavBar);
