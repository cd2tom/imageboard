const { User } = require("../models");

async function users() {
  const userRecords = await global.database("users").select();
  return userRecords.map(userRecord => new User(userRecord));
}

module.exports = { users };
