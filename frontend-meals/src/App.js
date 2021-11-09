import React from "react";
import "./App.css";
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
import AdminDashboard from "./components/adminDashboard/AdminDashboard";

function App() {
  let routes = (
    <Switch>
      <Route exact path="/" render={(props) => <Introduction {...props} />} />
      {/* <Route exact path="/about" render={(props) => <AboutPage {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route
        exact
        path="/unauthorized"
        render={(props) => <Unauthorized {...props} />}
      /> */}
      <Route exact path='/dashboard' render={(props)=><AdminDashboard {...props} />} />
    </Switch>
  );

  return (
    <div className="App">
      <Store>
        <AuthStore>
          <Router>
            
              <Header />
              {routes}
            
          </Router>
        </AuthStore>
      </Store>
    </div>
  );
}

export default App;
