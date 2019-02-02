const database = require("../database");
const Post = require("./post");

function Thread(attributes) {
  Object.assign(this, attributes);

  this.posts = new Promise(function(resolve) {
    database("posts")
      .where({ threadsId: attributes.id })
      .then(function(posts) {
        resolve(posts.map(post => new Post(post)));
      });
  });
}

module.exports = Thread;
