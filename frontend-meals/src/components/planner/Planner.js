import React, { useState } from "react";
import ServiceForm from "../serviceForm/Serviceform";
import Preview from "../preview/Preview";
import moment from "moment";
import "./planner.style.scss";
import Calendar from "react-calendar";
import { useStore } from "../../utility/reducers";

const Planner = () => {
  const [date, setDate] = useState(moment());
  const [dateChange, setDateChange] = useState(false);
  const [state, dispatch] = useStore();

  const onSelect = (e) => {
    setDate(moment(e));

    dispatch({ type: "RESET" });
  };

  const prevDay = () => {
    setDate(moment(date).subtract(1, "days"));
    setDateChange(true);
    dispatch({ type: "RESET" });
  };

  const nextDay = () => {
    setDate(moment(date).add(1, "days"));
    setDateChange(true);
    dispatch({ type: "RESET" });
  };

  return (
    <div className="planner-container">
      <div className="calendar-wrapper">
        <div className="calendar-col">
          <div className="calendar-container">
            <Calendar
              onClickDay={(e) => onSelect(e)}
              onSelect={date}
              date={date}
              className="react-calendar"
            />
          </div>
        </div>
      </div>

      <div className="serviceform-dates-wrapper">
        <div className="titles-wrapper">
          <div className="form-preview-container">
            <div className="serviceform-container">
              <div className="arrow_and_form_wrapper">
                <div className="date-arrows">
                  <div className="date-arrows-wrapper">
                    <p className="planner-title">Create Your Meals:</p>
                    <button
                      className="date-btns"
                      onClick={(data) => prevDay(data)}
                    >
                      &#xab;
                    </button>
                    <p
                      style={{ borderBottom: "solid .8px rgb(180, 180, 180)" }}
                    >
                      {date.format("MMM Do YY")}
                    </p>
                    <button className="date-btns" onClick={nextDay}>
                      &#xbb;
                    </button>
                  </div>
                </div>
                <ServiceForm
                  dates={date}
                  datesTree={date}
                  dateChanged={dateChange}
                />
              </div>
              <div className="home-wrapper">
                <Preview date={date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
