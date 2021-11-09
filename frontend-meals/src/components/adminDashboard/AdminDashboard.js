import React from 'react';
import PrivateRoute from '../../hoc/PrivateRoute'
import Planner from "../planner/Planner"
import Home from '../home/Home';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./adminDashboard.scss";
import Calendar from "react-calendar";
import { NavLink } from 'react-router-dom';
import HandleServiceForm from '../serviceForm/HandleServiceForm';


const AdminDashboard = ({children})=>{

    return (
      <div>
        <div className="dashboard-container">
          <div className="side-bar-container">
            <div className="calendar-container">
              <Calendar />
            </div>
            <div className="dash-menu-container">
              <h2>Foodies</h2>
              <ul className="dash-menu-ul">
                <li className="nav-li">
                  <NavLink className="active-links" to="#">
                    Create Menu
                  </NavLink>
                </li>
                <li className="nav-li">
                  <NavLink className="active-links" to="#">
                    View Menu
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-container">
            <div className='admin-form-container'>
              <HandleServiceForm />
            </div>
          </div>
        </div>
      </div>
    );
}

export default AdminDashboard;