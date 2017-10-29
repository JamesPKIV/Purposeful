/** This component takes the following required props:
*	title: title of the feed
*	linkTo: link that the title will be embedded in
*	feed_items: array of items to be displayed in the feed.
* 		each feed item must be an object with the following members:
			name: name or title to be displayed
			desc: desription of the item
**/


import React from 'react';
import { Link } from 'react-router-dom';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

// importing icons
import profile_pic from '../SEProfilePage/profile-pic-default.jpg';

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
			<Link 
	          to={{ pathname: "/SEprofile/" + item.id }} 
	          key={idx}
	        >
				<span className="feed-item col s2 m2 l2 push-l1" key={idx}>
					<img className="responsive-img circle picture" src={profile_pic} alt=""/>
					<p className="small-name">{item.name}</p>
		            {/*If we include a last name it needs to go here.*/}
		            <p className="desc">{item.present}</p>
				</span>
			</Link>
		);
	}
}





export default MentorFeed;
