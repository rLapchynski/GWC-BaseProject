var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

// Middleware for parsing JSON in HTTP request bodies
app.use(bodyParser.json());
app.use(express.json());

// Read in posts from ./data.json and parse as a js object
// Since this is a small project, ./data.json should stay relatively small,
//   so loading it all into memory and is probably fine
var postsFile = JSON.parse(fs.readFileSync('data.json', 'utf8'));


/*--------------------------------------------------------------------*/
/*-------------------------------ROUTES-------------------------------*/
/*--------------------------------------------------------------------*/

// Homepage
app.get('/', function(req, res) {
  res.sendFile('views/index.html', { root: __dirname });
});

// ./data.json for getting posts
// Since this is a small project, ./data.json should stay relatively small, 
//   so passing it around like this is probably fine
app.get('/data.json', function(req, res) {
  res.sendFile('data.json', { root: __dirname });
});

// Allow GET for files in ./views/ by path
// Security isn't a priority, so I'm not validating req.url
app.get('/views/*', function(req, res) {
  res.sendFile(req.url, { root: __dirname });
});

// Allow GET for files in ./assets/ by path
// Security isn't a priority, so I'm not validating req.url
app.get('/assets/*', function(req, res) {
  res.sendFile(req.url, { root: __dirname });
});

// Allow GET for files in ./scripts/ by path
// Security isn't a priority, so I'm not validating req.url
app.get('/scripts/*', function(req, res) {
  res.sendFile(req.url, { root: __dirname });
});

// Allow GET for files in ./styles/ by path
// Security isn't a priority, so I'm not validating req.url
app.get('/styles/*', function(req, res) {
  res.sendFile(req.url, { root: __dirname });
});

// For adding posts to ./data.json
app.post('/data.json', function(req, res){
  // Check if subject exists, if not create it
  if(postsFile[req.body.subject] === undefined){
    postsFile[req.body.subject] = []
  }
  
  // Append the post to the post list for the subject and update ./data.json
  postsFile[req.body.subject].push(req.body.post);
  updateFile();
  
  // Write a redirect to res
  // This won't actually do anything because of the 
  //   wrapper for HTTP requests (and responses)
  res.redirect('back');
});



/*--------------------------------------------------------------------*/
/*---------------------------SERVER STARTUP---------------------------*/
/*--------------------------------------------------------------------*/

var server = app.listen(8081, function() {
  // I'm not doing anything here because I don't want them
  //   to be distracted by the server startup and logging
});



/*--------------------------------------------------------------------*/
/*-----------------------------FUNCTIONS------------------------------*/
/*--------------------------------------------------------------------*/

// Write postsFile to ./data.json
function updateFile(){
  fs.writeFile('data.json', JSON.stringify(postsFile), 'utf8');
}