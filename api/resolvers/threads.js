const database = require("../database");
const { Thread } = require("../models");

async function threads() {
  const threadRecords = await database("threads");
  return threadRecords.map(threadRecord => new Thread(threadRecord));
}

async function thread(_, { id }) {
  const [threadRecord] = await database("threads").where({ "threads.id": id });
  return new Thread(threadRecord);
}

module.exports = { threads, thread };
