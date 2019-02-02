const database = require("../database");
const Board = require("../models/board");

async function boards() {
  const boardRecords = await database("boards");
  return boardRecords.map(boardRecord => new Board(boardRecord));
}

async function board(_, { id }) {
  const [boardRecord] = await database("boards").where({ "boards.id": id });
  return new Board(boardRecord);
}

module.exports = { boards, board };
