import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const useFetchedDataForm = (currentWeekstart, currentWeekEnd) => {
  const [currentMeals, setCurrentMeals] = useState();

  const fetchData = async (isAuthenticated, id) => {
    console.log(id)
    if (isAuthenticated && id) {
      try {
        const res = await axios.get(
          `https://greek-menu-planner.herokuapp.com/api/menus/${id}/meals/?for_date=${await moment(
            currentWeekstart
          ).format("YYYY-MM-DD")}&scope=week`
        );

        if (res.error) {
          console.log(res.error);
        } else if (res.data) {
          const data = res?.data;
          setCurrentMeals(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [fetchData, currentMeals];
};

export default useFetchedDataForm;
