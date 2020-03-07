import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Beginner from "./Beginner";
import Intermediate from "./Intermediate";
import Advanced from "./Advanced";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/beginner">
          <Beginner />
        </Route>
        <Route exact path="/intermediate">
          <Intermediate />
        </Route>
        <Route exact path="/advanced">
          <Advanced />
        </Route>
      </Switch>
    </Router>
  );
}
