import { useEffect, useState } from "react";
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



  
  useEffect(()=>{
    console.log(state)
  },[state[0]?.items])
 

  
  
  const handleFormSubmit = async (e, data) => {
    let image;

    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    meals(authState.isAuthenticated, authDispatch).then(async (menuId) => {
      try {
        const testData = {
                  id: "",
                  date: data?.date,
                  type: data?.type.toLowerCase(),
                  menu: menuId,
                  items: [{
                    name:data?.mealItem,
                    is_vegetarian:data?.is_vegetarian,
                    is_gluten_free:data?.is_gluten_free,
                    is_dairy_free:data?.is_dairy_free,
                    type:data?.mealType
                  }],
                  url: "http://rhpconstructioninc.com",
                };

                console.log(data)
                console.log(testData)

                const body = JSON.stringify(testData );
                const res = axios.post(
                  `http://localhost:8000/api/menus/${menuId}/meals/`,
                  body,
                  config
                );
                console.log(res)
                
      } catch (error) {
        console.log(error);
      }
    });

   
   
     
   
     
  
      
 
     
                

               

    
  };

  return [handleFormSubmit];
};

export default useSubmitForm;
