const { Board } = require("../models");

async function boards() {
  const boardRecords = await global.database("boards");
  return boardRecords.map(boardRecord => new Board(boardRecord));
}

async function board(_, { handle }) {
  const [boardRecord] = await global.database("boards").where({
    handle
  });
  return new Board(boardRecord);
}

module.exports = { boards, board };
