import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { useForm } from "../../hooks/useForm";

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

  const { data, setData, showForm, setShowForm, handleCreate } = useForm({
    MUTATION: CREATE_THREAD,
    defaults: { boardsId: Number(boardsId) },
    modelName: "Thread"
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
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              value={data.subject}
              onChange={e => setData({ ...data, subject: e.target.value })}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              cols="48"
              rows="4"
              value={data.body}
              onChange={e => setData({ ...data, body: e.target.value })}
            />
          </div>
          <div>
            <button onClick={handleCreate}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
