const { Thread } = require("../models");

async function threads(_, { limit }) {
  let query = global
    .database("posts")
    .where({ threadsId: null, archived: false });
  if (limit) query = query.limit(limit);
  const threadRecords = await query;
  return threadRecords.map(threadRecord => new Thread(threadRecord));
}

async function thread(_, { id }) {
  const [threadRecord] = await global.database("threads").where({
    threadsId: null,
    id,
    archived: false
  });
  return new Thread(threadRecord);
}

module.exports = { threads, thread };
