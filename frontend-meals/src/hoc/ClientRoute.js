import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuthStore } from "../utility/reducers/auth";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import { checkAuthenticated } from "../utility/auth";

const ClientRoute = ({ component, ...options }) => {
  const [state, dispatch] = useAuthStore();

  useEffect(() => {
    if (state.isAuthenticated) {
      checkAuthenticated(dispatch);
    }
  }, []);
  const finalComponent =
    state.isAuthenticated && state.role === "client" ? (
      <Home {...options} />
    ) : (
      Login
    );

  return <Route {...options} component={finalComponent} />;
};

export default ClientRoute;
