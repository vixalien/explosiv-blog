// pages/post/[slug].js

// Import dependencies, will be used later
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'front-matter'
import { marked } from 'marked'

// The Post component will be used to render each post
const Post = ({ post }) => (
	<>
		{/* Add a HEAD that shows the title of the page and expose the description of the post */}
		<Head>
			<title>{post.attributes.title} - vixalien</title>
			<meta name="description" content={post.attributes.description} />
		</Head>
		<main>
			{/* Show a link to the homepage */}
			<div style={{marginTop:"20px"}}><a href="/">Homepage</a><br/><br/></div>
			<small>{new Date(post.attributes.created).toDateString()}</small>
			<h1>{post.attributes.title}</h1>
			<p>{post.attributes.description}</p>
			<div>===</div>
			<br/>
			{/* Render the post's content as HTML in an `article` tag */}
			<article html={post.content}/>
		</main>
	</>
)

export default Post;

export const getPaths = async () => {
	// Read all files in the `blog` folder.
	const files = await fs.readdir(path.resolve('blog'))
	// Remove the training extensions like `.md` (remove the 3 last characters of filename)
	return files.map((filename) => filename.slice(0, filename.length - 3))
}

export const getProps = async (slug) => {
	// Read the file named `slug`+.md in the `blog` directory with the utf-8 format.
	let post = await fs.readFile(path.join('blog', `${slug}.md`), 'utf-8')
	// uses the `front-matter` package to get the post's attributes.
	post = matter(post)

	// parse the post's body to get the raw HTML content.
	post.content = marked(post.body)
	// Return an object that will be passed onto the default page export.
	return { post }
}
