import React from 'react';
import PrivateRoute from "../../hoc/PrivateRoute";
import Home from '../home/Home';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const ClientDashboard = () =>{

    return(<div>
        <Switch>
            <PrivateRoute exact to="/menu" roles={'client'} component={Home} />
        </Switch>
    </div>
        )
}

export default ClientDashboard;