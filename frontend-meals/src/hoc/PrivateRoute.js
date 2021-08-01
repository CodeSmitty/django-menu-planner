import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useAuthStore } from "../utility/reducers/auth";
import { checkAuthenticated } from "../utility/auth";
import Unauthorized from "../components/unAuthorized/Unauthorized";

const PrivateRoute = ({ component: Component, roles, ...options }) => {
  const [state, dispatch] = useAuthStore();
  const [hasPermission, setHasPermission] = useState(false);
  

  useEffect(() => {
    checkAuthenticated(dispatch);
    if (state.role === roles) {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }, [state.isAuthenticated, state.role, hasPermission]);
  return (
    <div>
      {hasPermission && <Route render={(props) => <Component {...props} />} />}
      {!hasPermission && (
        <Route
          render={(props) => {
            setTimeout(() => {
              return <Unauthorized {...props} />;
            }, 300);
          }}
        />
      )}
    </div>
  );
};

export default PrivateRoute;
