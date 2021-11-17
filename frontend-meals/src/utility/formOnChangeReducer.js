import React, { createContext, useContext, useReducer } from "react";

const storeContext = createContext();

const initialState =[]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return action.payload
    case "FORM_TEXT":
      return {
        ...state,
        name: action.name,
        entre: action.entre,
        mealType: action.mealType,
      };
      case "IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "SET_SERVICE_TYPE":
      return {
        ...state,
        type: action.payload.toLowerCase(),
      };
    
    case "MEALS":
      const newState = action.payload
      return newState;
     
    case "DINNER":
   
        return[{
          ...state,
          date: action.date,
          type: state?.type,
          menu: action.menu,
          items: [
            {
              name: action.mealItem,
              type: action.mealType,
              is_vegetarian: action.is_vegetarian,
              is_gluten_free: action.is_gluten_free,
              is_dairy_free: action.is_dairy_free,
            },
          ],
        }];
      
      

    case "RESET":
      return initialState;
    case "GET_DATA":
      console.log(action);
      return {
        ...state,
        [action.servType]: {
          ...state[action.servType],
          value: action.payload,
        },
      };
    case "GET_API_DATA":
      return {
        ...state,
        menu: action.payload,
        nextWeek: action.nextWeek,
        prevWeek: action.prevWeek,
      };
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
