import React, { Component } from 'react';
import Link from 'react-router';
import ChevronRIGHT from 'react-icons/lib/fa/chevron-right';

import './BelieveContent.css';
import purpose from './purposeful.jpg'


class BelieveContent extends Component {

	render () {
		return (
				<section className="semi-transparent-box">
					<h2 id="believe-title">Why build Purposeful?</h2>
					
					<p id="believe-content">
					<div  className="strongest">Every day millions of great <span id="ideas-color0">ideas</span>, <span id="ideas-color1">dreams</span>, and <span id="ideas-color2">aspirations</span> go unfilled...</div>
						<br/>
						<div id="believe-description">
					    We the Purposeful team believe that when people have access to the right skills, resources, and network, those ideas can be heard. 
						That our voice as a collective community is stronger when we are fueled by our passions and guided by those with experience and similar passions as us.
					    We decided to build a platform for people to find or pursue their purpose in life. A social platform for connecting us to our purpose. 
						</div>
						<br/>
						<div className="strongest">
						Purposeful is for all of us. 
						<br/>
						<br/>
						For becoming and being Purposeful as a community.
						</div>

					</p>
				</section>
		);
	}
}

export default BelieveContent;
