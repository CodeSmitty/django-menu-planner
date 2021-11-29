import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.style.scss";
import { useAuthStore } from "../../utility/reducers/auth";
import { checkAuthenticated, checkLogout } from "../../utility/auth";
import UnlockAccess from "../../hoc/unlockAccess/UnlockAccess";
import { menus } from "../../utility/data";

const NavBar = () => {
  const [state, dispatch] = useAuthStore();
  const handleLogout = () => {
    checkLogout(dispatch);
  };

  useEffect(() => {
  }, [state.isAuthenticated, state.role]);

  const links = menus.map((menu, i) => {
    return (
      <div key={i}>
        <UnlockAccess roles={menu.roles}>
          <li className="nav-li">
            <NavLink exact to={menu.path} className="active-links">
              {menu.title}
            </NavLink>
          </li>
        </UnlockAccess>
      </div>
    );
  });

  return (
    <div className="nav-container">
      <ul className="ul-container">
        <li className="nav-li">
          <NavLink className="active-links" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="active-links" to="/dashboard">
            dashboard
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="active-links" to="/about">
            About
          </NavLink>
        </li>
        {state.isAuthenticated ? (
          <li className="nav-li">
            <NavLink className="active-links" to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        ) : (
          <li className="nav-li">
            <NavLink className="active-links" exact to="/login">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
