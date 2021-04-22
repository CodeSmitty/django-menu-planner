import React from "react";
import "./App.css";
import Planner from "./components/planner/Planner";
import Store from "./utility/reducers";
import AuthStore from "./utility/reducers/auth"
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import AboutPage from "./components/about/About";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from './components/login/Login'
import PrivateRoute from './hoc/PrivateRoute';

function App() {
  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Route path="/about" render={(props) => <AboutPage {...props} />} />
    </Switch>
  );

  return (
    <div className="App">
      <Router>
        <Store>
          <AuthStore>
              <Header />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/planner" component={Planner} />
            
          </AuthStore>
        </Store>
      </Router>
    </div>
  );
}

export default App;
