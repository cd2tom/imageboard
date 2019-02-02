const database = require("../database");
const { User } = require("../models");

async function users() {
  const userRecords = await database("users").select();
  return userRecords.map(userRecord => new User(userRecord));
}

module.exports = { users };
