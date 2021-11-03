import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { Polecanie } from "./components/Polecanie";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/registration" exact component={() => <Registration />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/polecanie" exact component={() => <Polecanie />} />
          <Route path="/" exact component={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;