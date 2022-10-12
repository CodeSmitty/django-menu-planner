import React, { useState, useEffect } from "react";
import "./home.style.scss";
import moment from "moment";
import useApiFetchecData from "../../utility/customHooks/useApiFetchecData";
import { meals } from "../../utility/djangoApi/djangoApi";
import { useAuthStore } from "../../utility/reducers/auth";

const Home = () => {
  const [authState, dispatch] = useAuthStore();

  const [hidePrevButton, setHidePrevButton] = useState(true);
  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState({
    currentWeekstart: moment().startOf("week"),
    currentWeekEnd: moment().endOf("week"),
  });

  const { currentWeekstart, currentWeekEnd } = startOfCurrentWeek;

  const [fetchMealData, currentMeals] = useApiFetchecData(
    currentWeekstart,
    currentWeekEnd
  );

  const prevWeek = () => {
    const prevStart = currentWeekstart;
    const prevEnd = currentWeekEnd;
    const newWeekStart = moment(prevStart).subtract(7, "days");
    const newWeekEnd = moment(prevEnd).subtract(7, "days");

    setStartOfCurrentWeek({
      currentWeekstart: newWeekStart,
      currentWeekEnd: newWeekEnd,
    });
  };

  const nextWeek = () => {
    const newStart = currentWeekstart;
    const newEnd = currentWeekEnd;
    const newWeekStart = moment(newStart).add(1, "week");
    const newWeekEnd = moment(newEnd).add(1, "week");

    setStartOfCurrentWeek({
      currentWeekstart: newWeekStart,
      currentWeekEnd: newWeekEnd,
    });
  };

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps

    meals(authState.isAuthenticated, dispatch).then((res) => {
      fetchMealData(authState.isAuthenticated, res);
    });
  }, [startOfCurrentWeek]);

  return (
    <div className="home-section">
      <button
        className={hidePrevButton === true ? "prev-week" : "hide-next-week"}
        onClick={prevWeek}
      >
        <a href="#">Previous</a>
      </button>
      <div className="dates-and-titles">
        {`${currentWeekstart.format("MMM Do YY")} - ${currentWeekEnd.format(
          "MMM Do YY"
        )}`}
      </div>
      <button className="next-week" onClick={nextWeek}>
        <a href="#">Next</a>
      </button>

      <div className="service-container">{currentMeals}</div>
    </div>
  );
};

export default Home;
