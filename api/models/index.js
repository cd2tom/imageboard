const database = require("../database");

function Board(attributes) {
  Object.assign(this, attributes);

  this.threads = new Promise(function(resolve) {
    database("threads")
      .where({ boardsId: attributes.id })
      .then(function(threads) {
        resolve(threads.map(thread => new Thread(thread)));
      });
  });
}

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

function Post(attributes) {
  Object.assign(this, attributes);

  this.user = new Promise(function(resolve) {
    database("users")
      .where({ id: attributes.usersId })
      .then(function([user]) {
        resolve(new User(user));
      });
  });
}

function User(attributes) {
  Object.assign(this, attributes);

  this.posts = new Promise(function(resolve) {
    database("posts")
      .where({ usersId: attributes.id })
      .then(function(posts) {
        resolve(posts.map(post => new Post(post)));
      });
  });
}

module.exports = { Board, Thread, Post, User };
