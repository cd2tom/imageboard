const database = require("../database");

async function posts() {
  const posts = await database("posts").select();
  return posts;
}

async function post(_, { id }) {
  const [post] = await database("posts").where({ id });
  return post;
}

module.exports = { posts, post };
