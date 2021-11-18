import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: null,
  role: null,
  menu_id: null,
  user: null,
  isLoading: null,
  name: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTHENTICATED_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        role: action.role,
        id: action.id,
        user: action.user,
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
    case "CLIENT_SUCCESS":
      return { ...state, isAuthenticated: true, role: "client" };
    case "CHEF_SUCCESS":
      return { ...state, isAuthenticated: true, role: "staff" };
    case "ADMIN_SUCCESS":
      return { ...state, isAuthenticated: true, role: "admin" };
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
