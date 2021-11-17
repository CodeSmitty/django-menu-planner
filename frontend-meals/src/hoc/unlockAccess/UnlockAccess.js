import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../utility/reducers/auth";

const UnlockAccess = ({ children, roles }) => {
  const [state, dispatch] = useAuthStore();
  const [permission, setPermission] = useState();

  useEffect(() => {
    if (state.role === roles) {
      setPermission(true);
    } else {
      setPermission(false);
    }
  }, [state.isAuthenticated, state.role, permission]);

  let hasPermission = true;
  if (roles && roles.length > 0) {
    hasPermission = roles.includes(state.role);
  }
  return <>{hasPermission && children}</>;
};

export default UnlockAccess;
