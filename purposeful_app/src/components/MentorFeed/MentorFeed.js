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
import ActivityFeed from '../ActivityFeed/ActivityFeed';

// importing icons
import User from 'react-icons/lib/fa/user';


/** Class MentorFeed extends the ActivityFeed class to provide custom feed items
* for mentors. This class overwrites only the functions which differ
* from the ActivityFeed parent class - the function that defines the UI 
* of an individual item in the feed. 
* See ActivityFeed for the full inner workings of this class.
*/


class MentorFeed extends ActivityFeed {

	
	/** this function creates an individual feed component to be rendered in the feed.
	* Overwrite this function to change the view of the individual feed components.
	*/
	create_feed_item(item, idx) {
		return (
			<div className="col l2" key={idx}>
				<Link to={{ pathname: "/SEprofile", state: item }} >
					<Card className="feed-item" key={idx}>
						<User className="icon" />
						<h4> {item.name} </h4>
						<p className="desc"> mentor skills and interests or some other content </p>
					</Card>
				</Link>
			</div>
		);
	}
}

export default MentorFeed;
