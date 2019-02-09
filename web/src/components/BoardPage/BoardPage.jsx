import React from "react";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import Thread from "../Thread/Thread";
import ThreadsForm from "../Forms/ThreadsForm";

export default function BoardPage({ match }) {
  const handle = match.params.handle;

  const GET_BOARD = gql`
    {
      board(handle: "${handle}") {
        id
        handle
        name
        totalThreads

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

  const pageCount = Math.ceil(data.board.totalThreads / 15);

  return (
    <div className="board">
      <section className="intro">
        <h1>
          /{data.board.handle}/ - {data.board.name}
        </h1>
        <ThreadsForm boardsId={data.board.id} />
      </section>
      <section>
        {data.board.threads.map(thread => {
          return (
            <Thread
              key={thread.id}
              thread={thread}
              handle={handle}
              showTotalPosts
            />
          );
        })}
      </section>
      <section>
        {Array(pageCount)
          .fill()
          .map((_, i) => (
            <NavLink to={`/${data.board.handle}/${i}`} key={i}>
              {i + 1}
            </NavLink>
          ))}
      </section>
    </div>
  );
}
