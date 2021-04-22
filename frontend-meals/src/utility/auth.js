import Cookies from 'js-cookie';
import axios from 'axios';


export const login = async (username, password, dispatch) =>{

    
 const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      console.log("fetching data");


      try {
            const body = JSON.stringify({ username, password });
            const res = await axios.post(
                "http://localhost:8000/login/",
                body,
                config
            );

            if (res.data.success) {
              console.log(res.data)
                
                dispatch({type:'LOGIN_SUCCESS', payload:res.data.data})
                
            } else {
                console.log("fail");
            }

      }catch(error){
          console.log(error)
      }
      
    };
  