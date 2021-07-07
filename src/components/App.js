import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import MainView from "./mainView/MainView";
import Signup from "./signup/Signup";
import Login from "./login/Login";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <NavBar isUserLoggedIn={isUserLoggedIn} />

        <Switch>
          <Route exact path="/">
            <MainView />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
