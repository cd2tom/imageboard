import React from "react";
import moment from "moment";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";

export default function Board({ post, handle }) {
  return (
    <div className="meta">
      {post.name && <b className="subject">{post.name}</b>}
      <b class="name">{post.name ? post.name : "Anon"}</b>
      <span>
        {moment.unix(post.createdAt).format("MM/DD/YY(ddd) h:mm:ss a")}
      </span>
      <span>No. {post.id}</span>
      {handle && <Link to={`/${handle}/${post.id}`}>[Reply]</Link>}
    </div>
  );
}
