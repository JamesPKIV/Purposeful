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
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
// importing icons
import User from 'react-icons/lib/fa/user';
import profile_pic from '../SEProfilePage/profile-pic-default.jpg';

class ActivityFeed extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: this.props.title || "",
			feed_items: this.props.feedItems ||
				//default feed items
				[ {"name":"Pancho", "desc":"milk, skateboards"},
				{"name":"Ada", "desc":"programming, mathematics"},
				{"name":"Hermione", "desc":"runes, muggles"},
				{"name":"Roald", "desc":"writing, chocolate"},
				{"name":"Aretha", "desc":"singing, human rights"},
			  {"name":"Pele", "desc":"soccer, brazilian food"} ],
			start: 0,
			end: 5
		};

		this.create_feed_item = this.create_feed_item.bind(this);
	}

	/** this function creates an individual feed component to be rendered in the feed.
	* Overwrite this function to change the view of the individual feed components.
	*/
	create_feed_item(item, idx) {
		return (
				<Link to="/SEprofile">
					<span className="feed-item col s2 m2 l2" key={idx}>
						<img className="responsive-img circle picture" src={profile_pic} alt=""/>
						<p className="small-name">{item.name}</p>
						<p className="desc">{item.desc}</p>
					</span>
				</Link>
		);
	}

	get_title(){
		if(this.state.title === ""){
			return(
				<span/>
			);
		} else{
			return(
				<div className="row">
					<h4> {this.state.title} </h4>
				</div>
			);
		}
	}

	hor_scroll(scroll){

		this.setState({
			start: this.state.start + scroll,
			end: this.state.end + scroll
		});
	}

	scroll_arrow(feed_items, scroll){
		if(this.state.end > feed_items.length){
			return(
				<span/>
			);
		} else {
			return(
				<button className="btn-flat col s6 m6 l6 valign">
					<FaAngleRight onClick={() => this.hor_scroll(scroll)} className="profile-name"></FaAngleRight>
				</button>
			);
		}
	}

	render () {
		var feed_items = this.props.feedItems ?
			this.props.feedItems
			: this.state.feed_items;

		//render a feed component to display for each item in the feed_items array
		var this_feed = feed_items.slice(this.state.start, this.state.end);
		const feed_components = this_feed.map( (item, idx) =>
			this.create_feed_item(item, idx) );

		return (
			<span>
				{this.get_title()}
				<div className="row valign-wrapper">
					<div className="col s11 m11 l11">
						{feed_components} {/* Feed_components is an array where each array index holds a list of f */}
					</div>
					<div className="col s1 m1 l1">
						{this.scroll_arrow(feed_items, -1)}
						{this.scroll_arrow(feed_items, 1)}
					</div>
				</div>
			</span>
		);

	}
}

export default ActivityFeed;
