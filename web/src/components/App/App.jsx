import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "../../constants/routes";

import Header from "../Header/Header";
import Home from "../Home/Home";

import "../../css/normalize.scss";
import "../../css/core.scss";

export default function App() {
  document.title = "tom's website";
  return (
    <BrowserRouter>
      <div className="pageWrapper">
        <ScrollToTop />
        <Header />
        <Switch>
          <Route path={routes.home} component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  return <Route render={route => <SrollToTopEffect {...route} />} />;
}

function SrollToTopEffect({ location }) {
  const mounted = useRef(false);
  useEffect(
    function() {
      if (mounted.current) {
        window.scrollTo(0, 0);
      }
      mounted.current = true;
    },
    [location.pathname]
  );

  return null;
}
