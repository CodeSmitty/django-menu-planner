import React, { useEffect, useState } from "react";
import moment from "moment";
import RenderMeals from "./renderClientMeals/renderClientMeals";
import { meals } from "../../utility/djangoApi/djangoApi";
import { useAuthStore } from "../../utility/reducers/auth";
import useFetchedDataForm from "../../utility/customHooks/useApiFetchecData";
import WeeklyView from "../../hoc/weeklyView/WeeklyView";
import "./clientDashboard.scss";
import Calendar from "react-calendar";
import { NavLink } from "react-router-dom";

const ClientDashboard = () => {
  let currentWeekStart = moment().startOf("week");
  const [weekStart, setWeekStart] = useState(currentWeekStart);
  let currentWeekEnd = moment(weekStart).endOf("week");
  const [authState, authDispatch] = useAuthStore();
  const [fetchData, currentMeals] = useFetchedDataForm(
    weekStart,
    currentWeekEnd
  );

  const nextWeekButton = moment(weekStart).add(7, "days");
  const lastWeekButton = moment(weekStart).subtract(7, "days");

  const handleNextWeek = () => {
    setWeekStart(moment(weekStart).add(7, "days"));
  };
  const handleLastWeek = () => {
    setWeekStart(moment(weekStart).subtract(7, "days"));
  };

  const handleCalendarClick = (e) => {
    setWeekStart(moment(e).startOf("week"));
  };

  useEffect(() => {
    meals(authState.isAuthenticated, authDispatch).then((res) => {
      fetchData(authState.isAuthenticated, res);
    });
  }, [authState?.isAuthenticated, weekStart]);

  return (
    <div className="dashboard-container">
      <div className="side-bar-container">
        <div className="side-bar-container">
          <div className="calendar-container">
            <Calendar onClickDay={(e) => handleCalendarClick(moment(e))} />
          </div>
          <div className="dash-menu-container">
            <h2>Foodies</h2>
            <ul className="dash-menu-ul">
              <li className="nav-li">
                <NavLink className="active-links" to="#">
                  View Menu
                </NavLink>
              </li>
              <li className="nav-li">
                <NavLink className="active-links" to="#">
                  Late Plate Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="menu-container">
          <div className="arrow-btns-wrapper">
            <button className="arrow-btns" onClick={handleLastWeek}>
              &#x21DA; {moment(lastWeekButton).format(" MMM Do")}
            </button>
            <button className="arrow-btns" onClick={handleNextWeek}>
              {" "}
              {moment(nextWeekButton).format("MMM Do")} &#x21DB;
            </button>
          </div>
          <WeeklyView
            currentWeekStart={weekStart}
            currentWeekEnd={currentWeekEnd}
          >
            <div className="service-title-container">
              <h4 className="serviceType-title">Lunch</h4>
            </div>
            <RenderMeals date meals={currentMeals} serviceType={"lunch"} />
            <div className="service-title-container">
              <h4 className="serviceType-title">Dinner</h4>
            </div>
            <RenderMeals date meals={currentMeals} serviceType={"dinner"} />
          </WeeklyView>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
