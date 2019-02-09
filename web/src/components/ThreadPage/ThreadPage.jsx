import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

import { useQuery } from "react-apollo-hooks";
import Thread from "../Thread/Thread";
import PostForm from "./PostForm";

export default function ThreadPage({ match }) {
  const handle = match.params.handle;
  const id = match.params.id;

  const CREATE_POST = gql`
    mutation createPost($name: String!, $body: String!, $threadsId: Int!) {
      createPost(name: $name, body: $body, threadsId: $threadsId)
    }
  `;

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

  const [showForm, setShowForm] = useState(false);
  const [post, setPost] = useState({ threadsId: Number(id) });

  const handleCreatePost = useMutation(CREATE_POST, {
    variables: post
  });

  return (
    <div className="board">
      <section className="intro">
        <h1>
          /{data.board.handle}/ - {data.board.name}
        </h1>
        <PostForm threadsId={id} />
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
