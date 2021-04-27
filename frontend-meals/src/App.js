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
import Layout from "./hoc/Layout"
import Introduction from "./components/introduction/Introduction";

function App() {
  let routes = (
    <Switch>
      <Route exact path="/" render={(props) => <Introduction {...props} />} />
      <Route exact path="/about" render={(props) => <AboutPage {...props} />} />
      <Route exact path="/login" render={props =><Login {...props} />} />
    </Switch>
  );

  return (
    <div className="App">
      
        <Store>
          <AuthStore>
            <Router>
                <Layout>
                  <Header />
                  {routes}
                  <PrivateRoute exact path="/planner" component={Planner} />
                  <PrivateRoute exact path="/menu" component={Home} />
                </Layout>
            </Router> 
          </AuthStore>
        </Store>
      
    </div>
  );
}

export default App;
