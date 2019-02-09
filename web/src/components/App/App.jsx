import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "../../constants/routes";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import BoardPage from "../BoardPage/BoardPage";
import ThreadPage from "../ThreadPage/ThreadPage";

import "../../css/normalize.scss";
import "../../css/core.scss";

const client = new ApolloClient({
  uri: process.env.GQLENDPOINT
});

export default function App() {
  document.title = "tomchan";
  return (
    <ApolloProvider client={client}>
      <React.Suspense fallback="...">
        <BrowserRouter>
          <div className="pageWrapper">
            <ScrollToTop />
            <Header />
            <Switch>
              <Route path={routes.thread} component={ThreadPage} />
              <Route path={routes.boardPage} component={BoardPage} />
              <Route path={routes.board} component={BoardPage} />
              <Route path={routes.home} component={HomePage} />
            </Switch>
          </div>
        </BrowserRouter>
      </React.Suspense>
    </ApolloProvider>
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
