import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: null,
  role: null,
  menu_id: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user_id: action.user_id,
        role: action.role,
        user: action.user,
        menu_id: action.menu_id,
      };
    case "AUTHENTICATED_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user_id: action.user_id,
        role: action.role,
        user: action.user,
        menu_id: action.menu_id,
      };
    case "CHECK_MEAL_ID":
      return { ...state, menu_id: action.id, name: action.name };
    case "LOGGOUT_SUCCESS":
      return { ...state, isAuthenticated: false };

    default:
      return state;
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
