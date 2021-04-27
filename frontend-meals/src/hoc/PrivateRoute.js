import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuthStore} from '../utility/reducers/auth'
import Login from '../components/login/Login';
import axios from 'axios'
import { checkAuthenticated } from "../utility/auth";


const PrivateRoute = ({ component, ...options }) => {
    const [state, dispatch] = useAuthStore()
    const [checkAuth, setCheckAuth] = useState(false)
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    useEffect(()=>{
        if(state.isAuthenticated){
                checkAuthenticated(dispatch)
            setCheckAuth(true)
        }else(
            setCheckAuth(false)
        )
    },[])
    
console.log(checkAuth)
console.log(state.isAuthenticated)
    const finalComponent = state.isAuthenticated ? component : Login;
    // if(!checkAuth) return null;
    return(
  <Route
        {...options}
        component={finalComponent}
  />
)}

export default PrivateRoute;
