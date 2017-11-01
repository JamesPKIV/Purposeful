import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import FaCog from 'react-icons/lib/fa/cog';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import './DropDown.css';

class DropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            toggle: true
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleSettings = () => {
        console.log("Cog was clicked on");
        this.setState({
            toggle: !this.state.toggle
        });
        // need to create a dropdown bar in React
    }

    handleLogout = (ev) =>{
        ev.preventDefault();
        this.props.logout();
        this.props.history.push('/landing', this.props.history.location.state);
    }

    dropDesktop(){
        if(this.state.toggle){
            return (
              <span className="settingsBtn">
                <button className="col s6 m6 l6 settingsIcon" onClick={this.toggleSettings}> <FaCog size={28}/></button>
              </span>
            );
        }else{
            return(
                <span>
                    <span className="settingsBtn">
                      <button className="settingsIcon col s2 m2 l2 push-l8" onClick={this.toggleSettings}><FaCog className="light-green-text" size={28}/></button>
                    </span>
                    <div className="div-dropdown row">
                        <ul className="ul-dropdown col s12 m12 l12">
                            <li className="li-dropdown"><NavLink to='/donate' className="li-navs" >Donate</NavLink> </li>
                            <li className="li-dropdown"><NavLink to='/settings' className="li-navs">Settings</NavLink></li>
                            <li className="li-dropdown"><NavLink to='/help' className="li-navs">Help</NavLink></li>
                            <li className="li-dropdown"><NavLink to='/' onClick={this.handleLogout} className="li-navs">Logout</NavLink></li>
                        </ul>
                    </div>
                </span>
            );
        }
    }

    dropMobile(){
      if(this.state.toggle){
        return (
          <span className="settingsBtn">
            <button className="col s6 m6 l6 settingsIcon" onClick={this.toggleSettings}> <FaAlignJustify className="white-text" size={23}/></button>
          </span>
        );
      } else {
        return (
          <span>
            <span>
              <button className="settingsIcon" onClick={this.toggleSettings}><FaAlignJustify className="light-green-text" size={23}/></button>
            </span>
            <div >
              <ul>
                <li className="li-dropdown"><NavLink to='/collabs' className="li-navs">Collaborations </NavLink></li>
                <li className="li-dropdown"><NavLink to='/mentorship' className="li-navs">Mentorship </NavLink></li>
                <li className="li-dropdown"><NavLink to='stories' className="li-navs">Stories </NavLink></li>
                <li className="li-dropdown"><NavLink to='/chat' className="li-navs">Messages </NavLink></li>
                <li className="li-dropdown"><NavLink to='/profile' className="li-navs" >Profile </NavLink></li>
                <li className="li-dropdown"><NavLink to='/donate' className="li-navs" >Donate</NavLink> </li>
                <li className="li-dropdown"><NavLink to='/settings' className="li-navs">Settings</NavLink></li>
                <li className="li-dropdown"><NavLink to='/help' className="li-navs">Help</NavLink></li>
                <li className="li-dropdown"><NavLink to='/' onClick={this.handleLogout} className="li-navs">Logout</NavLink></li>
              </ul>
            </div>
          </span>
        );
      }
    }

    render() {
      if(window.innerWidth >= 700){
        return(
          this.dropDesktop()
        );
      } else {
        return(
          this.dropMobile()
        );
      }
    }

}

export default withRouter(DropDown);
