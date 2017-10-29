/** This component takes the following required props:
*	title: title of the feed
*	linkTo: link that the title will be embedded in
*	feed_items: array of items to be displayed in the feed.
* 		each feed item must be an object with the following members:
			name: name or title to be displayed
			desc: desription of the item
**/



import React, { Component } from 'react';
import { Collection, Card} from 'react-materialize';
import { Link } from 'react-router-dom';
import './ActivityFeed.css';

// importing icons
import User from 'react-icons/lib/fa/user';
import profile_pic from '../SEProfilePage/profile-pic-default.jpg';

class ActivityFeed extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: this.props.title || "feed title",
			feed_items: this.props.feedItems ||
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
			<div className="col l2" key={idx}>
				<Link to={{
					pathname: "/SEprofile",
				}}>
					<span className="feed-item col s2 m2 l2" key={idx}>
						<img className="responsive-img circle picture" src={profile_pic} alt=""/>
						<p className="small-name">{item.name}</p>
						<p className="desc">other content </p>
					</span>
				</Link>
			</div>

		);
	}

	render () {
		var feed_items = this.props.feedItems ?
			this.props.feedItems
			: this.state.feed_items;

		//render a feed component to display for each item in the feed_items array
		const feed_components = feed_items.map( (item, idx) =>
			this.create_feed_item(item, idx) );

		return (
			<div className="row">
				{feed_components} {/* Feed_components is an array where each array index holds a list of f */}
			</div>
		);

	}
}

export default ActivityFeed;
