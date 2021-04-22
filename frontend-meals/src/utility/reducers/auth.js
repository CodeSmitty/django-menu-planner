import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    isAuthenticated:null
}

const reducer = (state, action) =>{
    
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...state, isAuthenticated:true, user_id:action.payload}

        default:return state;

    }


};



const AuthStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);

export default AuthStore;
