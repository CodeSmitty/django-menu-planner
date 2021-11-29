import React, { useState } from "react";
import firebase from "../firebase.utility";
import { useAuthStore } from "../reducers/auth";
import axios from "axios";
import { useStore } from "../formOnChangeReducer";
import moment from "moment";

const useFetchedDataForm = (currentWeekstart, currentWeekEnd) => {
  const db = () => firebase.database();
  const [currentMeals, setCurrentMeals] = useState();

  
  const fetchData = async ( isAuthenticated, id) => {
    if (isAuthenticated) {
      console.log(id)
      try {
       
        const res = await axios.get(
          `http://localhost:3000/api/menus/${await id}/meals/?for_date=${await moment(
            currentWeekstart
          ).format("YYYY-MM-DD")}&scope=week`
        );

        if (res.error) {
          console.log(res.error);
        } else if (res.data) {
          const data = res?.data
            setCurrentMeals(data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  
  };

  

  return [
    fetchData,
    currentMeals,
  ];
};

export default useFetchedDataForm;
