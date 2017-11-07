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
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
// importing icons
import profile_pic from '../SEProfilePage/profile-pic-default.jpg';

class ActivityFeed extends Component {

	constructor (props) {
    var the_end;
		if(window.innerWidth < 700){
			the_end = 2;
		} else {
			the_end = 5;
		}


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
			  {"name":"Pele", "desc":"soccer, brazilian food"},
			  {"name":"Paris", "desc":"fashion, entretainment"},
			  {"name":"Ash", "desc":"catchin' 'em all, traveling"} ],
			start: 0,
			end: the_end
		};

		this.create_feed_item = this.create_feed_item.bind(this);
		this.hor_scroll = this.hor_scroll.bind(this);
		this.scroll_arrow = this.scroll_arrow.bind(this);
	}

	/** this function creates an individual feed component to be rendered in the feed.
	* Overwrite this function to change the view of the individual feed components.
	*/
	create_feed_item(item, idx) {
		return (
			<Link to="/SEprofile" key={idx}>
				<span className="feed-item col s5 m2 l2 push-s2" key={idx}>
					<img className="responsive-img circle picture" src={profile_pic} alt=""/>
					<p className="small-name">{item.name}</p>
					{/*If we include a last name it needs to go here.*/}
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
		if(feed_items.length >= 5){
			if(scroll === -1){
				if(this.state.start <= 0){
					return(
						<button onClick={()=> this.hor_scroll(scroll)} className="btn blue-gray lighten-4 disabled valign">
							<FaAngleLeft className="profile-name"></FaAngleLeft>
						</button>
					);
				} else {
					return(
						<button onClick={()=> this.hor_scroll(scroll)} className="btn-flat light-green lighten-4 valign">
							<FaAngleLeft className="profile-name"></FaAngleLeft>
						</button>
					);
				}
			} else {
				if(this.state.end >= feed_items.length){
					return(
						<button onClick={()=> this.hor_scroll(scroll)} className="btn blue-gray lighten-4 disabled valign">
							<FaAngleRight className="profile-name"></FaAngleRight>
						</button>
					);
				} else {
					return(
						<button onClick={()=> this.hor_scroll(scroll)} className="btn-flat light-green lighten-4 valign">
							<FaAngleRight className="profile-name"></FaAngleRight>
						</button>
					);
				}
			}
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

		if(window.innerWidth >= 700){
			return(
				<span>
					{this.get_title()}
					<div className="row valign-wrapper">
						<div className="col s1 m1 l1">
							{this.scroll_arrow(feed_items, -1)}
						</div>
						<div className="col s10 m10 l10">
							{feed_components} {/* Feed_components is an array where each array index holds a list of f */}
						</div>
						<div className="col s1 l1 m1">
							{this.scroll_arrow(feed_items, 1)}
						</div>
					</div>
				</span>
			);
		} else {
			return(
				<span>
					{this.get_title()}
					<div className="row valign-wrapper">
						<div className="col s12 m10 l10">
							{feed_components} {/* Feed_components is an array where each array index holds a list of f */}
						</div>
					</div>
					<div className="row valign-wrapper">
						<div className="col s5 m1 l1">
							{this.scroll_arrow(feed_items, -1)}
						</div>
						<div className="col s5 l1 m1 push-s1">
							{this.scroll_arrow(feed_items, 1)}
						</div>
					</div>
				</span>
			);
		}
	}
}

export default ActivityFeed;
