import React, { useState, useEffect } from "react";
import "./login.style.scss";
import CSRFtoken from "../CSRFToken/CSRFtoken";
import { Redirect } from "react-router-dom";

import { login } from "../../utility/auth";
import { useAuthStore } from "../../utility/reducers/auth";
import { checkAuthenticated } from "../../utility/auth";
import Introduction from "../../components/introduction/Introduction";

const Login = ({ isAuthenticated }) => {
  const [state, dispatch] = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password, dispatch);

    checkAuthenticated(dispatch);
  };

  useEffect(() => {}, [state.isAuthenticated, state.role]);

  if (state.isAuthenticated) {
    if (state.role === "chef") return <Redirect to="/planner" />;
    else if (state.role === "client") {
      return <Redirect to="/menu" />;
    } else {
      return <Redirect to="/" component={Introduction} />;
    }
  }

  return (
    <div>
      <div className="login-form-container">
        <form onSubmit={(e) => onSubmit(e)} className="login-form">
          <CSRFtoken />
          <label className="login-label">Type your username</label>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => onChange(e)}
            required
          />

          <label className="login-label">Type your password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onChange(e)}
            required
          />
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
