export const formCreatorObject = {
  mealItem: {
    name:'mealItem',
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Enter Meal Item",
    },
    value: "",
    serviceType: {
      entre: {
        elementType: "radio",
        elementConfig: {
          name: "entre",
          type: "radio",
        },
      },
      side: {
        elementType: "radio",
        elementConfig: {
          name: "side",
          type: "radio",
        },
      },
      other: {
        elementType: {
          name: "other",
          type: "radio",
        },
      },
    },
    diets: {
      is_vegetarian: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_vegetarian",
          type: "checkbox",
        },
        isChecked: false,
      },
      is_gluten_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_gluten_free",
          type: "checkbox",
        },
        isChecked:false
      },
      is_dairy_free:{
          elementType:'checkbox',
          elementConfig:{
              name:"is_dairy_free",
              type:"checkbox"
          },
          isChecked:false
      },
      is_vegan:{
          elementType:'checkbox',
          elementConfig:{
              name:"is_diary_free",
              type:"checkbox"
          },
          isChecked:false
      }
    },
  },
};