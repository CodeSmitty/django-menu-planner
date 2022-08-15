import React, { useEffect, Fragment, useState } from "react";
import { checkAuthenticated } from "../utility/auth";
import { useAuthStore } from "../utility/reducers/auth";

const Layout = ({ children }) => {
  const [authState, dispatch] = useAuthStore();

  useEffect(() => {
    checkAuthenticated(dispatch)
    
  }, [authState?.menu_id]);

  return <Fragment>{children}</Fragment>;
};

export default Layout;
