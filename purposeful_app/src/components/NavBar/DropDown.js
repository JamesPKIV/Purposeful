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
        try{
          this.props.logout();
          this.props.history.push('/landing');
        }catch(e){ // this.props.logout() is not defined if user is not logged in, 
          this.props.history.push('landing');
        }
    }

    dropDesktop(){
        if(this.state.toggle){
            return (
              <span className="settingsBtn">
                <button className="settingsIcon" onClick={this.toggleSettings}> <FaCog size={28}/></button>
              </span>
            );
        }else{
            return(
                <span>
                    <span className="settingsBtn">
                      <button className="settingsIcon " onClick={this.toggleSettings}><FaCog className="light-green-text" size={28}/></button>
                    </span>
                    <div>
                        <ul className="ul-dropdown">
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
            <button className="settingsIcon" onClick={this.toggleSettings}> <FaAlignJustify className="white-text" size={23}/></button>
          </span>
        );
      } else {
        return (
          <span>
            <span>
              <button className="settingsIcon" onClick={this.toggleSettings}><FaAlignJustify className="light-green-text" size={23}/></button>
            </span>
            <div >
              <ul className="ul-dropdown">
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
