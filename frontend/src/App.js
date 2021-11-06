import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Registration, Polecanie, Navigation, Footer} from "./components";
import Player from "./components/Player";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/registration" exact component={() => <Registration />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/polecanie" exact component={() => <Polecanie />} />
          <Route path="/" exact component={() => <Home />} />
          <Route path="/search" exact component={() => <Player />} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;