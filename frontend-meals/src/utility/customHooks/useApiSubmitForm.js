import { useEffect, useState } from "react";
import { storage } from "../firebase.utility";
import { useStore } from "../formOnChangeReducer";
import { useAuthStore } from "../reducers/auth";
import moment from "moment";
import Cookies from "js-cookie";
import axios from "axios";
import { meals } from "../djangoApi/djangoApi";
import useApiFetchecData from "./useApiFetchecData";  

const useSubmitForm = (props) => {
  const [state, dispatch] = useStore();
  const [authState, authDispatch] = useAuthStore();
  //const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState();

  

  const handleFormSubmit = async (e, data, currentMeals) => {
    let image;
    const menu_id = authState.menu_id

    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
  

    try {
      const testData = {
        id: "",
        date: data?.date,
        type: data?.type.toLowerCase(),
        menu: menu_id,
        items: [
          {
            id: "",
            name: data?.mealItem,
            is_vegetarian: data?.is_vegetarian,
            is_gluten_free: data?.is_gluten_free,
            is_dairy_free: data?.is_dairy_free,
            type: data?.mealType,
          },
        ],
        url: "http://rhpconstructioninc.com",
      };
      const body = JSON.stringify(testData);
      const res = axios.post(
        `http://localhost:3000/api/menus/${menu_id}/meals/`,
        body,
        config
      );
      dispatch({ type: "RESPONSE_DATA", payload: res });
    } catch (error) {
      console.log(error);
    }
  };

  return [handleFormSubmit, response];
};

export default useSubmitForm;
