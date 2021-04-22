import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuthStore} from '../utility/reducers/auth'
import Login from '../components/login/Login';
import axios from 'axios'


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
            console.log(state)
                const res =  axios.get("http://localhost:8000/authenticated/", config);
                
                if(res.data){
                    console.log(res)
                }
                   
            setCheckAuth(true)
        }else(
            setCheckAuth(false)
        )
    },[])

    const finalComponent = state.isAuthenticated ? component : Login;
    // if(!checkAuth) return null;
    return(
  <Route
        {...options}
        component={finalComponent}
  />
)}

export default PrivateRoute;
