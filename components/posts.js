// components/posts.js
// Load the posts as an object.
import postsJSON from "../src/posts";

let PostsCard = ({ ...props }) => {
    // Convert the posts object into an array.
	let posts = Object.entries(postsJSON)

	return (
		<p>
			<h2>Posts</h2>
			<div className="posts">
     			{/* Display the posts one by one */}
				{posts.map(([slug, { title, description, created }]) => (
					<p>
						<a href={"/post/" + slug}>{title} &rarr;</a><br/>
						<small>{new Date(created).toDateString()}</small><br/>
						<span>{description}</span>
					</p>
				))}
			</div>
		</p>
	);
};

export default PostsCard;
