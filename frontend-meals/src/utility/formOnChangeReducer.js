import React, { createContext, useContext, useReducer } from "react";

const storeContext = createContext();



const initialState = {
  id: "",
  date: "",
 type:'',
 menu:'',
  items:[]
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_TEXT":
      console.log(state)
      return{
        ...state,
        name:action.name,
        entre:action.entre,
        mealType:action.mealType,
        
      }
    case "SET_SERVICE_TYPE":
      // if(action.payload.toLowerCase() === 'dinner'){
      //   return {
      //     ...state,
      //     type:{
      //       lunch:false,
      //       dinner:true
      //     }
      //   }
      // }else{
      //   return{
      //     ...state,
      //     type:{
      //       lunch:true,
      //       dinner:false
      //     }
      //   }
      // }
      return{
        ...state,
        type:action.payload.toLowerCase()
      }
    case "IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "LUNCH":
      console.log(action?.type)
      return {
        ...state,
        date:action.date,
        type: state.type,
        menu:action.menu, 
        items:[...state?.items, {
          name:action.mealItem,
          type:action.mealType,
          is_vegetarian:action.is_vegetarian,
          is_gluten_free:action.is_gluten_free,
          is_dairy_free:action.is_dairy_free

        }]
      };
    case "DINNER":
      console.log(action?.type)
      if(action.type === 'DINNER'){
        if(state.type !== [...state?.type]){
          console.log("it's not the same")
        }
        return {
        ...state,
        date: action.date,
        type: state?.type,
        menu:action.menu,
        items: [
          ...state?.items,
          {
            name: action.mealItem,
            type: action.mealType,
            is_vegetarian: action.is_vegetarian,
            is_gluten_free: action.is_gluten_free,
            is_dairy_free: action.is_dairy_free,
          },
        ],
      };
      }
      return;
      
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
