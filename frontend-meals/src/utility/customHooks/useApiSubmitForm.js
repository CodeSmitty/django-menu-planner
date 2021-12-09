import { useState } from "react";
import { useStore } from "../formOnChangeReducer";
import { useAuthStore } from "../reducers/auth";
import { post } from "../services/firebase/firebase";
import { storage } from "../services/firebase/firebase.utility";
import Cookies from "js-cookie";
import axios from "axios"; 

const useSubmitForm = (props) => {
  const [state, dispatch] = useStore();
  const [authState, authDispatch] = useAuthStore();
  //const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState();

  const menu_id = authState.menu_id

  const handleFormSubmit = async (e, data, currentMeals) => {
    let image = data?.img
    
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
      if(image){

        const uploadTask = storage.ref(`images/${image?.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snap) => {},
          (error) => {
            setError(error)
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(async (url) => {
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
                      url: url,
                    },
                  ],
                };
                const body = JSON.stringify(testData);
                const res = await axios.post(
                  `http://localhost:3000/api/menus/${menu_id}/meals/`,
                  body,
                  config
                );
                console.log(res);

                dispatch({ type: "RESPONSE_DATA", payload: res });
              });
          }
        );
      }else{
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
              url:"",
            },
          ]
        };
        const body = JSON.stringify(testData);
        const res =await  axios.post(
          `http://localhost:3000/api/menus/${menu_id}/meals/`,
          body,
          config
        );
          console.log(res)
        dispatch({ type: "RESPONSE_DATA", payload: await res?.data });
      }
      

     
      
      
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete =async (e, mealItemId) =>{
    console.log(mealItemId)
     const config = {
       method: "DELETE",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         "X-CSRFToken": Cookies.get("csrftoken"),
       },
     };

     const data = 111
     const body = JSON.stringify(data);
     console.log(body)
     const res = await axios.delete(
       `http://localhost:3000/api/menus/${menu_id}/meals/46/`,
       config
     );

     console.log(res)
  }

  return [handleFormSubmit, handleDelete];
};

export default useSubmitForm;
