import React from "react";
import Meta from "./Meta";
import Post from "./Post";

export default function Board({ thread, handle }) {
  return (
    <article className="thread">
      <Meta post={thread} handle={handle} />
      <p>{thread.body}</p>
      {thread.posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </article>
  );
}
