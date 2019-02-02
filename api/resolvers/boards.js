const database = require("../database");

function threadsSQ(id) {
  return database("threads")
    .select(database.raw("json_agg(threads.*)"))
    .whereRaw(`threads."boardsId" = ${id ? id : "boards.id"}`)
    .as("threads");
}

async function boards() {
  const boards = await database("boards")
    .leftJoin("threads", "boards.id", "threads.boardsId")
    .select("boards.*", threadsSQ())
    .groupBy("boards.id");

  return boards;
}

async function board(_, { id }) {
  const [board] = await database("boards")
    .where({ "boards.id": id })
    .leftJoin("threads", "boards.id", "threads.boardsId")
    .select("boards.*", threadsSQ(id));

  return board;
}

module.exports = { boards, board };
