// This file provides a basic and very simple wrapper for XMLHttpRequest, to add new posts and retrieve all current posts
// This should be part of the 'base project,' so the club doesn't have to learn how HTTP works

// subject should be a string; post should be a JSON object
// subject and post are packaged into a JSON string and sent as a HTTP POST
function addPost(subject, post){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/data.json', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
          subject: subject,
          post: post
        }));
}

// callback is a function to be called when the server responds
// The first and only argument of the callback is an object parsed from
//   /data.json containing a list of every post in each subject, with the 
//   name of the subject as the key
function getAllPosts(callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() { 
    if (xhr.readyState == 4 && xhr.status == 200){
      callback(JSON.parse(xhr.responseText));
    }
  }
  xhr.open("GET", '/data.json', true);
  xhr.send(null);
}