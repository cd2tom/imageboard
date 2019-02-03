import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Thread from "../Thread/Thread";

export default function BoardPage({ match }) {
  const handle = match.params.handle;

  const GET_BOARD = gql`
    {
      board(handle: "${handle}") {
        handle
        name

        threads(limit: 15) {
          id
          subject
          name
          body
          totalPosts
          createdAt

          posts(limit: 5) {
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
          <b>[Start a new thread]</b>
        </p>
      </section>
      <section>
        {data.board.threads.map(thread => {
          return <Thread key={thread.id} thread={thread} handle={handle} />;
        })}
      </section>
    </div>
  );
}
