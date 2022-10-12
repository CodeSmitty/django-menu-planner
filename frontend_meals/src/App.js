import React, {useEffect} from "react";
import "./App.css";
import moment from 'moment'
import Store from "./utility/formOnChangeReducer";
import AuthStore from "./utility/reducers/auth";
import Header from "./components/header/Header";
import AboutPage from "./components/about/About";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login/Login";
import Layout from "./hoc/Layout";
import Introduction from "./components/introduction/Introduction";
import Dashboard from "./components/dashboard/Dashboard";
import Unauthorized from "./components/unAuthorized/Unauthorized";

function App() {


  let routes = (
    <Switch>
      <Route exact path="/" render={(props) => <Introduction {...props} />} />
      <Route exact path="/about" render={(props) => <AboutPage {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route
        exact
        path="/unauthorized"
        render={(props) => <Unauthorized {...props} />}
      />
      <Route
        exact
        path="/dashboard"
        render={(props) => <Dashboard {...props} />}
      />
    </Switch>
  );

  return (
    <div className="App">
      <Store>
        <AuthStore>
          <Layout>
            <Router>
            
                <Header />
                {routes}
            
            </Router>
          </Layout>
        </AuthStore>
      </Store>
    </div>
  );
}

export default App;
