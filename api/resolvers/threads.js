const database = require("../database");
const { Thread } = require("../models");

async function threads() {
  const threadRecords = await database("posts").where({ threadsId: null });
  return threadRecords.map(threadRecord => new Thread(threadRecord));
}

async function thread(_, { id }) {
  const [threadRecord] = await database("threads").where({
    threadsId: null,
    id
  });
  return new Thread(threadRecord);
}

module.exports = { threads, thread };
