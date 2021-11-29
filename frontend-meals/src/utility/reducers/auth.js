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
    case "AUTHENTICATED_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        role: action.role,
        menu_id: action.menu_id,
        user: action.user,
        user_id:action.user_id
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: true,
        user_id: action.payload,
        role: action.role,
        level: action.id,
        user: action.user,
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
