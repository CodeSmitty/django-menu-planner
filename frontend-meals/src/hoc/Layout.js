import React, { useEffect, Fragment, useState } from "react";
import { checkAuthenticated } from "../utility/auth";
import { useAuthStore } from "../utility/reducers/auth";

const Layout = ({ children }) => {
  const [authState, dispatch] = useAuthStore();

  useEffect(() => {
    (async () => {
      return await checkAuthenticated(dispatch);
    })();
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default Layout;
