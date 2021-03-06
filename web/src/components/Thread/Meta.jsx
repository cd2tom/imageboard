import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Meta({ post, handle }) {
  return (
    <div className="meta">
      {post.subject && <b className="subject">{post.subject}</b>}
      <b className="name">{post.name ? post.name : "Anon"}</b>
      <span>
        {moment(Number(post.createdAt)).format("MM/DD/YY(ddd) h:mm:ssa")}
      </span>
      <span>No.{post.id}</span>
      {handle && <Link to={`/${handle}/thread/${post.id}`}>[Reply]</Link>}
    </div>
  );
}
