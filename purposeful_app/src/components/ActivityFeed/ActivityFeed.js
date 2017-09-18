/** This component takes the following required props:
*	title: title of the feed
*	linkTo: link that the title will be embedded in
*	feed_items: array of items to be displayed in the feed.
* 		each feed item must be an object with the following members:
			name: name or title to be displayed 
			desc: desription of the item
**/



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ActivityFeed.css';

// importing icons
import User from 'react-icons/lib/fa/user';

class ActivityFeed extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: this.props.title || "feed title",
			feed_items: this.props.feed_items || 
				//default feed items
				[ {"name":"Name", "desc":"availability, skills and interests"},
				{"name":"Name", "desc":"availability, skills and interests"},
				{"name":"Name", "desc":"availability, skills and interests"},
				{"name":"Name", "desc":"availability, skills and interests"},
				{"name":"Name", "desc":"availability, skills and interests"} ]
		};

		this.create_feed_item = this.create_feed_item.bind(this);
	}
	
	/** this function creates an individual feed component to be rendered in the feed. 
	* Overwrite this function to change the view of the individual feed components.
	*/
	create_feed_item(item, idx) {
		return (
			<div className="feed-item" key={idx}> 
				<User className="icon" />
				<h4> {item.name} </h4>
				<p className="desc"> {item.desc} </p>
			</div>
		);
	}

	render () {
		//render a feed component to display for each item in the feed_items array
		const feed_components = this.state.feed_items.map( (item, idx) =>
			this.create_feed_item(item, idx) );
	
		return (			
			<article className="activity-feed"> 				
				<Link className="feed-title" to={this.props.linkTo}> <h4> {this.state.title} </h4> </Link>
				<section className="feed-box">
					{feed_components}
				</section>
			</article>
		);
		
	}
}

export default ActivityFeed;
