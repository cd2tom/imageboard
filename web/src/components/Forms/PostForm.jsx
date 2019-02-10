import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

export default function PostForm({ threadsId }) {
  const CREATE_POST = gql`
    mutation createPost($name: String, $body: String!, $threadsId: Int!) {
      createPost(name: $name, body: $body, threadsId: $threadsId)
    }
  `;

  const [showForm, setShowForm] = useState(false);
  const [post, setPost] = useState({ threadsId: Number(threadsId) });

  const createPost = useMutation(CREATE_POST, {
    variables: post,
    update: function(proxy, result) {
      console.log(proxy, result, "dasdasdsad");
    }
  });

  function handleCreatePost() {
    if (!post.body) {
      return;
    }
    createPost()
      .then(resp => {
        debugger;
      })
      .catch(e => {
        debugger;
      });
  }

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
              value={post.name}
              onChange={e => setPost({ ...post, name: e.target.value })}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              cols="48"
              rows="4"
              value={post.body}
              onChange={e => setPost({ ...post, body: e.target.value })}
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
