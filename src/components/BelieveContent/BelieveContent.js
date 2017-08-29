import React, { Component } from 'react';
import './BelieveContent.css';

class BelieveContent extends Component {

	render () {
		return (
			<section className="believe-container semi-transparent-box">
				<h2 id="believe-title">Why build Purposeful?</h2>
				
				<div id="believe-content">
					<div  className="strongest">Every day millions of great <span id="ideas-color0">ideas</span>, <span id="ideas-color1">dreams</span>, and <span id="ideas-color2">aspirations</span> go unfulfilled...
				 	</div>
					<br/>
					<div id="believe-description">
					    We believe that when people have access to the right skills, resources, and network, those great ideas can grow into great endeavors.
						That our voice as individuals and as a collective community is stronger when we are fueled by our passions and guided by those with experience who want to help us succeed.
					    We are building a platform for people to find, pursue or create their own purpose in life. 
					</div>
					<br/>
					<div className="strongest">
						Purposeful is a social platform for connecting us to our purpose -   
						<br/> for being and becoming Purposeful as a community.
					</div>
					<br/>
					<hr/>
					<div id="articles-div">
						<p>To read more about our motivations,
						check out these articles written by our team:
						</p>
                        <ul id="articles-list">
                            <a href="https://www.linkedin.com/pulse/calculated-risk-why-ive-decided-invest-8000-dollars-towards-parra?published=t" target="_newtab">
                                <li className="left">
                                    A calculated risk: Why I've decided to invest $8000 dollars towards living a life of Purpose
                                </li>
                            </a>
                            <a href="https://www.linkedin.com/pulse/compiled-success-why-some-people-find-quicker-than-others-oscar-parra?trk=mp-reader-card" target="_newtab">
                                <li className="left">
                                    Compiled Success: Why some people find success quicker than others?
                                </li>
                            </a>
						</ul>
					</div>
				</div>
			</section>



		);
	}
}

export default BelieveContent;
