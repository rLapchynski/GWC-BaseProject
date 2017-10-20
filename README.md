# GWC Base Project

server.js provides an express-based HTTP server

scripts/HttpWrapper.js is a basic wrapper for HTTP GET and POST, providing simple functions that allow for adding and retreiving posts

views/index.html is a basic webpage to test the functionality of the functions in HttpWrapper.js and test the server

data.json stores the posts as json which is parsed into a js object by getAllPosts() in HttpWrapper.js

   Each element in data.json is an array of posts in a subject, with the name of the subject as the key
	
   Each post should be a stringified js object, but technically can be anything; HttpWrapper.js doesn't process it.
