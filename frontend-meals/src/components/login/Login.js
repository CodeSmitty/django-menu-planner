import React, {useState, useEffect} from 'react';
import "./login.style.scss";
import CSRFtoken from '../CSRFToken/CSRFtoken'
import { Redirect, Link } from "react-router-dom";

import {login} from '../../utility/auth';


const Login = ({  isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [data, setData] = useState();
  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };



  if (isAuthenticated) {
    return <Redirect to="/planner" />;
  }

  return (
    <div>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)} className="login-form" action="">
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