// index.js
import PostsCard from "../components/posts.js";

let Homepage = () => {
	return <>
		<Head>
			<title>my blog</title>
			<meta name="description" content="This is my own blog"/>
		</Head>
		<main>
    		<h1>Welcome to my blog</h1>
    		<p>This is my cool new blog built with Explosiv. <a href="/about">About Me</a></p>
    		<PostsCard/>
    	</main>
	</>
};

export default Homepage;