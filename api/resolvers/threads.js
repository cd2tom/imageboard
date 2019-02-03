const database = require("../database");
const { Thread } = require("../models");

async function threads(_, { limit }) {
  let query = database("posts").where({ threadsId: null });
  if (limit) query = query.limit(limit);
  const threadRecords = await query;
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
