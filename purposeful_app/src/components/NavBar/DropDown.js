import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FaCog from 'react-icons/lib/fa/cog';
import './DropDown.css';

class DropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            toggle: true
        }
        this.toggleSettings = this.toggleSettings.bind(this);
    }

    toggleSettings = () => {
        console.log("Cog was clicked on");
        this.setState({
            toggle: !this.state.toggle
        });
        // need to create a dropdown bar in React 
      }

    render(){
        if(this.state.toggle){
            return (
                <button className="settingsBtn" onClick={this.toggleSettings}><FaCog className="FaCog" size={28} /></button>
            );
        }else{
            return(
                <div>
                    <div>
                    <button className="settingsBtn" onClick={this.toggleSettings}><FaCog className="FaCog2" size={28} /></button>
                    </div>
                    <div className="div-dropdown">
                        <ul className="ul-dropdown">
                            <li className="li-dropdown"><NavLink to='../profile' className="li-navs" >Donate</NavLink> </li>
                            <li className="li-dropdown"><NavLink to='../profile' className="li-navs">Settings</NavLink></li>
                            <li className="li-dropdown"><NavLink to='../profile' className="li-navs">Help</NavLink></li>
                            <li className="li-dropdown"><NavLink to='../profile' className="li-navs">Logout</NavLink></li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
}

export default DropDown;