import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Thread from "../Thread/Thread";

export default function ThreadPage({ match }) {
  const handle = match.params.handle;
  const id = match.params.id;

  const GET_BOARD = gql`
    {
      board(handle: "${handle}") {
        handle
        name

        thread(id: ${id}) {
          id
          subject
          name
          body
          createdAt

          posts(limit: 0) {
            id
            name
            body
            createdAt
            threadsId
          }
        }
      }
    }
  `;

  const { data, error } = useQuery(GET_BOARD);
  if (error) return `Error! ${error.message}`;

  return (
    <div className="board">
      <section className="intro">
        <h1>
          /{data.board.handle}/ - {data.board.name}
        </h1>
        <p>
          <b>[Post a reply]</b>
        </p>
      </section>
      <section>
        <Thread
          key={data.board.thread.id}
          thread={data.board.thread}
          handle={handle}
        />
      </section>
    </div>
  );
}
