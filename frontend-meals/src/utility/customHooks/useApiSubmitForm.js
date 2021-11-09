import { useState } from "react";
import { storage } from "../firebase.utility";
import { useStore } from "../formOnChangeReducer";
import { useAuthStore } from "../reducers/auth";
import moment from "moment";
import Cookies from "js-cookie";
import axios from "axios";
import { meals } from "../djangoApi/djangoApi";

const useSubmitForm = (props, dispatch) => {
  const [state] = useStore();
  const [authState, authDispatch] = useAuthStore();
  //const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  
  const handleFormSubmit = async (e, image, menuId) => {
    
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
                const testData = {
                  id:"",
                  date: moment(state?.date).format("YYYY-MM-DD"),
                  type: state?.type === 'lunch' ? "lunch" : "dinner",
                  menu: state?.menu,
                  items: state?.items
                };

                console.log(testData)

                const body = JSON.stringify(testData);
                const res = await axios.post(
                  `http://localhost:8000/api/menus/${7}/meals/`,
                  body,
                  config
                );

               

    // meals(authState.isAuthenticated, authDispatch).then(async (menuId) => {
    //   try {
    //     const uploadTask = storage.ref(`images/${image?.name}`).put(image);
    //     uploadTask.on(
    //       "state_changed",
    //       (snap) => {},
    //       (error) => {
    //         setError(error);
    //       },
    //       () => {
    //         storage
    //           .ref("images")
    //           .child(image.name)
    //           .getDownloadURL()
    //           .then(async (url) => {
    //             const meals = state
    //               ? Object.values(state).filter((meal, i) => {
    //                   return (
    //                     meal?.type === "side" ||
    //                     meal?.type === "entre" ||
    //                     meal?.type === "other"
    //                   );
    //                 })
    //               : null;

    //             if (res.data) {
    //             } else {
    //               console.log("no response");
    //             }
    //           });
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  };

  return [handleFormSubmit];
};

export default useSubmitForm;
