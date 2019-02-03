import React from "react";
import { Link, NavLink } from "react-router-dom";
import routes from "../../constants/routes";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const GET_BOARDS = gql`
  {
    boards {
      handle
    }
  }
`;

import "./header.scss";

export default function Header() {
  const { data, error } = useQuery(GET_BOARDS);
  if (error) return `Error! ${error.message}`;

  return (
    <header className="header">
      <nav>
        <span>[</span>
        {data.boards.map(board => (
          <NavLink key={board.handle} to={`${routes.home}${board.handle}`}>
            {board.handle}
          </NavLink>
        ))}
        <span>]</span>
      </nav>
    </header>
  );
}
