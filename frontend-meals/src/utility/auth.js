import Cookies from 'js-cookie';
import axios from 'axios';



export const login = async (username, password, dispatch) =>{

    
 const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };


      try {
            const body = JSON.stringify({ username, password });
            const res = await axios.post(
              "http://localhost:8000/api/login/",
              body,
              config,
            );

            if (res.data.success) {
                console.log(res.data.success)
                dispatch({type:'LOGIN_SUCCESS'})
                
            } else {
              console.log(res)
                console.log("fail");
            }

      }catch(error){
          console.log(error)
      }
      

    };
  
    export const checkAuthenticated = async (dispatch)=> {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };
      

      try{
          console.log('hola')
          const res = await axios.get(
            "http://localhost:8000/api/authenticated",
            config,
            
          );
          if (res.data.error || res.data.isAuthenticated=== 'error') {
            console.log("Error: You weren't authenticated my guy.");
          } else if(res.data.isAuthenticated === "success") {
            console.log("yaaay");
            dispatch({type:"AUTHENTICATED_SUCCESS"})
          }
       

      }catch(err){
        console.log(err)
      }

    }