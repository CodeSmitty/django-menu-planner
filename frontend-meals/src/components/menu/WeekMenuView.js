import React, { useState, useEffect } from "react";
import moment from "moment";
import "./weekyMenuView.scss";
import { useStore } from "../../utility/formOnChangeReducer";
import ServiceTypeUI from "../serviceTypeUI/ServiceTypeUI";
import RenderMeals from "./LunchOrDinnerView/RenderMeals";
import useFetchedDataForm from "../../utility/customHooks/useApiFetchecData";
import useSubmitForm from "../../utility/customHooks/useApiSubmitForm";
import { meals } from "../../utility/djangoApi/djangoApi";
import { useAuthStore } from "../../utility/reducers/auth";

const WeeklyMenuView = () => {
  const [state, dispatch] = useStore();
  let currentWeekStart = moment().startOf("week");
  let currentWeekEnd = moment().endOf("week");
  const [fetchData, currentMeals] = useFetchedDataForm(
    currentWeekStart,
    currentWeekEnd
  );

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
    // meals(authState.isAuthenticated, authDispatch).then((res) => {
    //   fetchData(authState.isAuthenticated, res);
    // });
    console.log(authState)
    fetchData(authState.isAuthenticated, authState.menu_id)
  }, [authState, state]);

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
              />
            </div>
            <div className="service-form-container">
              <ServiceTypeUI
                formArray={input}
                dayIndex={i}
                day={day}
                servType="lunch"
                currentMeals={currentMeals}
                handleFormCreate={handleFormCreate}
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
              />
            </div>
            <div className="service-form-container">
              <ServiceTypeUI
                formArray={input}
                dayIndex={i}
                servType="dinner"
                day={day}
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
