// src/posts.js

// Import dependencies
let path = require("path");
let fs = require("fs");
let fm = require("front-matter");

// This function resolves where files or folders are relative to the `cwd` or current working directory.
let resolve = (...link) => path.resolve(process.cwd(), ...link);

// Where all our blog posts are stored
let blogsPath = resolve("blog");

let blogs = fs
    // Get all blog posts in the `blogsPath` folder.
	.readdirSync(blogsPath)
	.map((blog) => {
     	// Get the slug. i.e `first-post` from `first-post.md`
		let slug = blog.replace(/\.md$/, "");
		// And return an array of posts and their front matter
		// Example: [ "first-post", { title: "My First Blog Post", created: 1639915508100, description: "..." } ]
		return [
			slug,
			{ slug, ...fm(fs.readFileSync(resolve(blogsPath, blog), "utf8")).attributes },
		]
	})
	// Sort the blog posts by date created
	.sort(([_, a], [$, b]) => b.created - a.created);

// Export the posts as an object
module.exports = Object.fromEntries(blogs);
