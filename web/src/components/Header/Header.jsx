import React from "react";
import { Link } from "react-router-dom";
import routes from "../../constants/routes";

import "./header.scss";

export default function Header() {
  return (
    <header className="header">
      <div>
        <h2>
          <Link to={routes.home}>tomchan.com</Link>
        </h2>
      </div>
    </header>
  );
}
