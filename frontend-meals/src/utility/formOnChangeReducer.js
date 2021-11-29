import React, { createContext, useContext, useReducer } from "react";

const storeContext = createContext();

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'RESPONSE_DATA':
      return {state:action.payload}
    case "IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => useContext(storeContext);

export default Store;
