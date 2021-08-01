import axios from "axios";

import Cookies from "js-cookie";

export const meals = async (isAuthenticated, dispatch) => {
  if (isAuthenticated) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    try {
      const res = await axios.get("http://localhost:8000/api/menus/", config);
      if (res) {
        const id = res.data[0].id;
        dispatch({ type: "CHECK_MEAL_ID", id: id, name: res.data[0].name });
        return res.data[0].id;
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const getMeals = async (isAuthenticated, dispatch, id, date) => {
  if (isAuthenticated) {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/menus/${await id}/meals/`
      );

      if (res.data.error) {
        console.log(res.data.error);
      } else if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  }
};
