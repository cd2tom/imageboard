import React from "react";
import gql from "graphql-tag";
import { useForm } from "../../hooks/useForm";

export default function PostForm({ threadsId }) {
  const CREATE_POST = gql`
    mutation createPost($name: String, $body: String!, $threadsId: Int!) {
      createPost(name: $name, body: $body, threadsId: $threadsId)
    }
  `;

  const { data, setData, showForm, setShowForm, handleCreate } = useForm({
    MUTATION: CREATE_POST,
    defaults: { threadsId: Number(threadsId) },
    modelName: "Post"
  });

  return (
    <div className="formContainer">
      <b onClick={() => setShowForm(!showForm)}>
        [{showForm ? "Close" : "Post a reply"}]
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
