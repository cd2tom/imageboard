import React from "react";
import Meta from "./Meta";

export default function Post({ post }) {
  return (
    <div className="post">
      <span>>></span>
      <div className="postInner">
        <Meta post={post} />
        <p>{post.body}</p>
      </div>
    </div>
  );
}
