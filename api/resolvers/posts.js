// const database = require("../database");
// const { Post } = require("../models");

// async function posts() {
//   const postRecords = await database("posts");
//   return postRecords.map(postRecord => new Post(postRecord));
// }

// async function post(_, { id }) {
//   const [postRecord] = await database("posts").where({ id });
//   return new Post(postRecord);
// }

module.exports = {};
