import "./index.css";
import Auth from "./components/Auth/Auth";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Room from "./components/Room/Room";
import socketIOClient from "socket.io-client";
import Chat from "./components/Chat/Chat";

const ENDPOINT = "http://localhost:3001";

function App() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { origins: "*:*" });
    socket.onopen(() => {
      console.log("123");
    });
  });

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
