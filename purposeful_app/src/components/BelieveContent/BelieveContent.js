import React, { Component } from 'react';
import Link from 'react-router';
import ChevronRIGHT from 'react-icons/lib/fa/chevron-right';

import './BelieveContent.css';

class BelieveContent extends Component {

	render () {
		return (
				<section className="semi-transparent-box">
					<h2 id="believe-title">Why Purposeful?</h2>
					
					<p id="believe-content">
						Every day a great idea, dream or aspiration goes unfulfilled 
						because people don’t have the skills, network, or resources to make it happen. 
						<br/>
						<br/>
						<span className="asked"> We asked ourselves: </span>
						<span className="power-statement">Could we improve people's lives by empowering them
							to follow their dreams?
						</span>
						<span className="power-statement">Is there a way we could connect these great aspirations to great people
					 	who have the ability and desire to help?
						</span>
						<span className="power-statement">If we could help people find purpose in their lives, <i>shouldn't we?</i>
						</span>
						<br/>
						<span className="answered"> We answered:</span>
						<span className="power-statement strongest"> <i>Yes, yes we should.</i> 
						<br/>Thus, Purposeful was born.
						</span>

					</p>
				</section>
		);
	}
}

export default BelieveContent;
