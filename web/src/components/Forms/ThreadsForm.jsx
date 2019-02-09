import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

export default function ThreadsForm({ boardsId }) {
  const CREATE_THREAD = gql`
    mutation createThread(
      $name: String
      $body: String!
      $subject: String
      $boardsId: Int!
    ) {
      createThread(
        name: $name
        body: $body
        subject: $subject
        boardsId: $boardsId
      )
    }
  `;

  const [showForm, setShowForm] = useState(false);
  const [thread, setThread] = useState({ boardsId: Number(boardsId) });

  const handleCreatePost = useMutation(CREATE_THREAD, {
    variables: thread
  });

  return (
    <div className="formContainer">
      <b onClick={() => setShowForm(!showForm)}>
        [{showForm ? "Close" : "Start a new thread"}]
      </b>
      {showForm && (
        <div className="form">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={thread.name}
              onChange={e => setThread({ ...thread, name: e.target.value })}
            />
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              value={thread.subject}
              onChange={e => setThread({ ...thread, subject: e.target.value })}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              cols="48"
              rows="4"
              value={thread.body}
              onChange={e => setThread({ ...thread, body: e.target.value })}
            />
          </div>
          <div>
            <button onClick={handleCreatePost}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
