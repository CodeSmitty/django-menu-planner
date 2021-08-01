import React from 'react';
import PrivateRoute from '../../hoc/PrivateRoute'
import Planner from "../planner/Planner"
import Home from '../home/Home';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const AdminDashboard = ({children})=>{

    return (
      <div>
        <Switch>
          <PrivateRoute
            exact
            path="/planner"
            roles={"chef"}
            component={Planner}
          />
          <PrivateRoute exact path="/menu" roles={"chef"} component={Home} />
        </Switch>
      </div>
    );
}

export default AdminDashboard;