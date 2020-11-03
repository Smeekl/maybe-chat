import "./index.css";
import Auth from "./components/Auth/Auth";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Room from "./components/Room/Room";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
