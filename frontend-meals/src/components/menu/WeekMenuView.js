import React, { useState, useEffect } from "react";
import moment from "moment";
import FormFields from "../serviceForm/formfields/Formfields";
import "./weekyMenuView.scss";
import { useStore } from "../../utility/formOnChangeReducer";
import { useFormik } from "formik";
import ServiceTypeUI from "../serviceTypeUI/ServiceTypeUI";
import LunchMeals from "./LunchOrDinnerView/LunchMeals";


const WeeklyMenuView = () => {
  const [state, dispatch] = useStore();
  let currentWeekStart = moment().startOf("week");
  let currentWeekEnd = moment().endOf("week"); 
  
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

  const days = getCurrentDaysOfWeek();

  const handleFormCreate = (day, i, event) => {
    
    event.preventDefault();
    const initialState = {
      items: "",
      day_index: i,
      serviceType:event.target.getAttribute('name')
    };

    dispatch({type:'SET_SERVICE_TYPE', payload: event.target.getAttribute('name')})
    setInput((prev) => [...prev, initialState]);
  };

 
  useEffect(() => {
    
     console.log(state)
     
  }, [state]);
  

  const createWeeklyMenuView = days.map((day, i) => {
    return (
      <div key={i} className="day-container">
        <h3>{moment(day).format("dddd MMM Do YY")}</h3>
        <div className="serviceType-container">
          <div className="serviceType-title-container">
            <h4 className="serviceType-title">Lunch</h4>
            <div
              name="lunch"
              className="add-meal-btn"
              onClick={(e) => handleFormCreate(day, i, e)}
            >
              +
            </div>
          </div>
          <div className="service-content-container">
            <ServiceTypeUI
              formArray={input}
              dayIndex={i}
              day={day}
              servType="lunch"
            />
            <ul>
              {state?.type === "lunch" ? (
                <LunchMeals
                  formArray={input}
                  dayIndex={i}
                  date={day}
                  serviceType={"lunch"}
                />
              ) : null}
            </ul>
          </div>
        </div>
        <div className="serviceType-container">
          <div className={"serviceType-title-container"}>
            <h4 className="serviceType-title">Dinner</h4>
            <div
              name="dinner"
              className="add-meal-btn"
              onClick={(e) => handleFormCreate(day, i, e)}
            >
              +
            </div>
          </div>
          <div className="service-content-container">
            <ServiceTypeUI
              formArray={input}
              dayIndex={i}
              servType="dinner"
              day={day}
            />
            <ul>
              {state?.type === "dinner" ? (
                <LunchMeals
                  formArray={input}
                  dayIndex={i}
                  date={day}
                  serviceType={"dinner"}
                />
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return <div>{createWeeklyMenuView}</div>;
};

export default WeeklyMenuView;
