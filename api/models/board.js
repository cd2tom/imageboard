const database = require("../database");
const Thread = require("./thread");

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

module.exports = Board;
