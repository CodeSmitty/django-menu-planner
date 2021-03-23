import React from "react";
import "./App.css";
import Planner from "./components/planner/Planner";
import Store from "./utility/reducers";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import AboutPage from "./components/about/About";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from './components/login/Login'

function App() {
  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Route path="/about" render={(props) => <AboutPage {...props} />} />
    </Switch>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Store>
          <Header />
          <Login  />
        </Store>
      </BrowserRouter>
    </div>
  );
}

export default App;
