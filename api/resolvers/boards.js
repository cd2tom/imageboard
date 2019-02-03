const database = require("../database");
const { Board } = require("../models");

async function boards(_, args) {
  const boardRecords = await database("boards");
  return boardRecords.map(boardRecord => new Board(boardRecord));
}

async function board(_, { handle }) {
  const [boardRecord] = await database("boards").where({
    handle
  });
  return new Board(boardRecord);
}

module.exports = { boards, board };
