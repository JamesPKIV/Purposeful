import React, { Component } from 'react';
import './BelieveContent.css';

class BelieveContent extends Component {

	render () {
		return (
				<section className="believe-container semi-transparent-box">
					<h2 id="believe-title">Why build Purposeful?</h2>
					
					<p id="believe-content">
					<div  className="strongest">Every day millions of great <span id="ideas-color0">ideas</span>, <span id="ideas-color1">dreams</span>, and <span id="ideas-color2">aspirations</span> go unfilled...</div>
						<br/>
						<div id="believe-description">
					    We believe that when people have access to the right skills, resources, and network, those great ideas can grow into great endeavors.
						That our voice as individuals and as a collective community is stronger when we are fueled by our passions and guided by those with experience who want to help us succeed.
					    We are building a platform for people to find, pursue or create their own purpose in life. 
						</div>
						<br/>
						<div className="strongest">
						Purposeful is a social platform for connecting us to our purpose -   
						<br/>
						for being and becoming Purposeful as a community.
						</div>

					</p>
				</section>
		);
	}
}

export default BelieveContent;
