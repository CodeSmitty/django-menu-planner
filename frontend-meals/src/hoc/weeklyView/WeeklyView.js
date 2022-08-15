import React, { Children, createContext, useContext } from "react";
import moment from "moment";

const WeeklyView = ({
  currentWeekStart,
  currentWeekEnd,
  children,
  myCalendar,
}) => {
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

  Children.map((x, i) => {});
  const eachDayOfTheWeek = days.map((day, i) => {
    return (
      <div key={i} className="day-container">
        <h3 className="date_title">{moment(day).format("dddd MMM Do YY")}</h3>
        {React.Children.map(children, (child, index) => {
          return (
            <div className="serviceType-container">
              <div className="service-content-container">
                <div className="service-render-container">
                  {React.cloneElement(child, { date: day })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return <>{eachDayOfTheWeek}</>;
};

export default WeeklyView;
