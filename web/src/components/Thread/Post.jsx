import React from "react";
import Meta from "./Meta";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postInner">
        <Meta post={post} />
        <p>{post.body}</p>
      </div>
    </div>
  );
}
