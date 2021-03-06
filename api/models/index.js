function Board(attributes) {
  Object.assign(this, attributes);

  this.threads = function({ limit, offset }) {
    let query = global
      .database("posts")
      .where({
        boardsId: attributes.id,
        threadsId: null,
        archived: false
      })
      .orderBy("updatedAt", "desc")
      .limit(limit);
    if (offset) query = query.offset(limit * (offset - 1));
    return new Promise(function(resolve) {
      query.then(function(threads) {
        resolve(threads.map(thread => new Thread(thread)));
      });
    });
  };

  this.thread = function({ id }) {
    return new Promise(function(resolve) {
      global
        .database("posts")
        .where({ id, archived: false })
        .then(function([thread]) {
          resolve(new Thread(thread));
        });
    });
  };

  this.totalThreads = new Promise(function(resolve) {
    global
      .database("posts")
      .where({ threadsId: null, boardsId: attributes.id, archived: false })
      .count("id")
      .then(function([{ count }]) {
        resolve(count);
      });
  });
}

function Thread(attributes) {
  Object.assign(this, attributes);

  this.totalPosts = new Promise(function(resolve) {
    global
      .database("posts")
      .where({ threadsId: attributes.id })
      .count("id")
      .then(function([{ count }]) {
        resolve(count);
      });
  });

  this.posts = function({ limit, order = "asc" }) {
    let query = global
      .database("posts")
      .where({ threadsId: attributes.id })
      .orderBy("createdAt", order);
    if (limit) query = query.limit(limit);
    return new Promise(function(resolve) {
      query.then(function(posts) {
        resolve(posts.map(post => new Post(post)));
      });
    });
  };
}

function Post(attributes) {
  Object.assign(this, attributes);

  this.user = attributes.userId
    ? new Promise(function(resolve) {
        global
          .database("users")
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
    global
      .database("posts")
      .where({ usersId: attributes.id })
      .then(function(posts) {
        resolve(posts.map(post => new Post(post)));
      });
  });
}

module.exports = { Board, Thread, Post, User };
