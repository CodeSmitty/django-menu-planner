import React, { useState, useEffect } from "react";
import moment from "moment";
import "./weekyMenuView.scss";
import { useStore } from "../../utility/formOnChangeReducer";
import ServiceTypeUI from "../serviceTypeUI/ServiceTypeUI";
import RenderMeals from "./renderMeals/RenderMeals";
import useFetchedDataForm from "../../utility/customHooks/useApiFetchecData";
import useSubmitForm from "../../utility/customHooks/useApiSubmitForm";
import { meals } from "../../utility/djangoApi/djangoApi";
import { useAuthStore } from "../../utility/reducers/auth";
import axios from "axios";

const WeeklyMenuView = ({ calendarDates, arrowDates }) => {
  const [state, dispatch] = useStore();
  const [showForm, setShowForm] = useState(false);
  let currentWeekStart = moment(calendarDates).startOf("week");
  let currentWeekEnd = moment(calendarDates).endOf("week");
  const [fetchData, currentMeals] = useFetchedDataForm(
    currentWeekStart,
    currentWeekEnd
  );

  const [handleFormSubmit, handleDelete, handleEdit] = useSubmitForm();

  const [authState, authDispatch] = useAuthStore();

  const [input, setInput] = useState([]);

  const getCurrentDaysOfWeek = () => {
    let days = [];
    let day = currentWeekStart;
    while (day <= currentWeekEnd) {
      days.push(day.toDate());
      day = day.clone().add(1, "days");
    }
    return days;
  };

  useEffect(() => {
    fetchData(authState.isAuthenticated, authState.menu_id);
    console.log(authState);
  }, [authState.authenticated, authState.menu_id, state]);

  const days = getCurrentDaysOfWeek();

  const handleFormCreate = (i, event) => {
    event.preventDefault();
    const initialState = {
      items: "",
      day_index: i,
      serviceType: event.target.getAttribute("name"),
    };
    setInput((prev) => [...prev, initialState]);
  };

  const createWeeklyMenuView = days.map((day, i) => {
    return (
      <div key={i} className="day-container">
        <h3 className="date_title">{moment(day).format("dddd MMM Do YY")}</h3>
        <div className="serviceType-container">
          <div className="serviceType-title-container">
            <h4 className="serviceType-title">Lunch</h4>
            <div
              name="lunch"
              className="add-meal-btn"
              onClick={(e) => handleFormCreate(i, e, true)}
            >
              +
            </div>
          </div>
          <div className="service-content-container">
            <div className="service-render-container">
              <RenderMeals
                formArray={input}
                dayIndex={i}
                date={day}
                serviceType={"lunch"}
                meals={currentMeals}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
            <div className="service-form-container">
              <ServiceTypeUI
                formArray={input}
                dayIndex={i}
                day={day}
                servType="lunch"
                currentMeals={currentMeals}
              />
            </div>
          </div>
        </div>
        <div className="serviceType-container">
          <div className={"serviceType-title-container"}>
            <h4 className="serviceType-title">Dinner</h4>
            <div
              name="dinner"
              className="add-meal-btn"
              onClick={(e) => handleFormCreate(i, e, true)}
            >
              +
            </div>
          </div>
          <div className="service-content-container">
            <div className="service-render-container">
              <RenderMeals
                formArray={input}
                dayIndex={i}
                date={day}
                serviceType={"dinner"}
                meals={currentMeals}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
            <div className="service-form-container">
              <ServiceTypeUI
                formArray={input}
                dayIndex={i}
                servType="dinner"
                day={day}
                currentMeals={currentMeals}
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div>{createWeeklyMenuView}</div>;
};

export default WeeklyMenuView;
