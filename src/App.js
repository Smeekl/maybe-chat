import "./index.css";
import Auth from "./components/Auth/Auth";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Room from "./components/Room/Room";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/joinRoom" component={Room} />
            </Switch>
        </Router>
    );
}

export default App;