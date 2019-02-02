const database = require("../database");

function Board(attributes) {
  Object.assign(this, attributes);

  this.threads = async function() {
    const threads = await database("threads").where({ boardsId: this.id });
    return threads;
  };
}

module.exports = Board;
