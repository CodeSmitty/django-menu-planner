import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.style.scss";
import { useAuthStore } from "../../utility/reducers/auth";

const NavBar = () => {
  const [state, dispatch] = useAuthStore()

  const isAuthLinks = (
    <div className="auth-link-container">
      <li className="nav-li">
        <NavLink className="active-links" exact to="/menu">
          Menu
        </NavLink>
      </li>
      <li className="nav-li">
        <NavLink className="active-links" exact to="planner">
          Planner
        </NavLink>
      </li>
    </div>
  );

  return (
    <div className="nav-container">
      <ul className="ul-container">
        <li className="nav-li">
          <NavLink className="active-links" exact to="/">
            Home
          </NavLink>
        </li>
        {state.isAuthenticated === true ? isAuthLinks : null}
        <li className="nav-li">
          <NavLink className="active-links" exact to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="active-links" exact to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
