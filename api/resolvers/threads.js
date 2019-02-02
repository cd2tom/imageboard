const database = require("../database");

function postsSQ(id) {
  return database("posts")
    .select(database.raw("json_agg(posts.*)"))
    .whereRaw(`posts."threadsId" = ${id ? id : threads.id}`)
    .as("posts");
}

async function threads() {
  const threads = await database("threads")
    .leftJoin("posts", "threads.id", "posts.threadsId")
    .select("threads.*", postsSQ())
    .groupBy("threads.id");
  return threads;
}

async function thread(_, { id }) {
  const [thread] = await database("threads")
    .leftJoin("posts", "threads.id", "posts.threadsId")
    .select("threads.*", postsSQ(id))
    .groupBy("threads.id");

  return thread;
}

module.exports = { threads, thread };
