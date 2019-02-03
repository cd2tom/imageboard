const database = require("../database");

function Board(attributes) {
  Object.assign(this, attributes);

  this.threads = new Promise(function(resolve) {
    database("posts")
      .where({ boardsId: attributes.id, threadsId: null })
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
      .orderBy("createdAt", "desc")
      .then(function(posts) {
        resolve(posts.map(post => new Post(post)));
      });
  });
}

function Post(attributes) {
  Object.assign(this, attributes);

  this.user = attributes.userId
    ? new Promise(function(resolve) {
        database("users")
          .where({ id: attributes.usersId })
          .then(function([user]) {
            resolve(new User(user));
          });
      })
    : undefined;
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
