import "./index.css";
import Auth from "./components/auth/auth";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/chat/chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
