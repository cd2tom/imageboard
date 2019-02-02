const database = require("../database");

function Post(attributes) {
  Object.assign(this, attributes);
}

module.exports = Post;
