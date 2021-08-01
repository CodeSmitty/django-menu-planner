import React, { createContext, useContext, useReducer } from "react";

const storeContext = createContext();

const service = {
  serviceType: {
    lunch: "",
    dinner: "",
  },
  entre: {
    name: "",
    is_vegetarian: false,
    is_gluten_free: false,
    is_dairy_free: false,
    type:null
  },
  sideOne: {
    name: "",
    is_vegetarian: false,
    is_gluten_free: false,
    is_dairy_free: false,
    type:null
  },
  sideTwo: {
    name: "",
    is_vegetarian: false,
    is_gluten_free: false,
    is_dairy_free: false,
    type:null
  },
  description: {
    name: "",
    is_vegetarian: false,
    is_gluten_free: false,
    is_dairy_free: false,
    type:null
  },
  image: null,
};  



const reducer = (state = service, action) => {
  switch (action.type) {
    case "ENTRE":
    case "SIDEONE":
    case "SIDETWO":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          [action.payload]: !state[action.servType][action.payload],
          
        },
      };
    case "ENTRE_TEXT":
    case 'SIDEONE_TEXT':
    case 'SIDETWO_TEXT':
    case 'DESCRIPTION_TEXT':
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          name: action.payload,
          type: action.serviceType,
        },
      };
    case "DESCRIPTION":
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          [action.payload]: !state[action.servType][action.payload],
        },
      };
    case "IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "LUNCH":
      return {
        ...state,
        serviceType: {
          ...state.serviceType,
          dinner: false,
          [action.payload]: !state.serviceType[action.payload],
        },
        [action.servType]: {
          ...state[action.servType],
          name: action.loadedData,
        },
      };
    case "DINNER":
      return {
        ...state,
        serviceType: {
          ...state.serviceType,
          lunch: false,
          [action.payload]: !state.serviceType[action.payload],
        },
        [action.servType]: {
          ...state[action.servType],
          name: action.loadedData,
        },
      };
    case "RESET":
      console.log("reset");
      if (action.type === "RESET") {
        return service;
      }
      break;
    case "SUBMITTED":
      return {
        ...state,
        state: action.payload,
      };

    case "GET_DATA":
     console.log(action)
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          value: action.payload,
        },
      };
    case "GET_API_DATA":
      return{
        ...state, menu:action.payload, nextWeek:action.nextWeek, prevWeek:action.prevWeek
      }
    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, service);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => useContext(storeContext);

export default Store;
