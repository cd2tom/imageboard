const database = require("../database");

async function users() {
  const users = await database("users").select();
  return users;
}

module.exports = { users };
