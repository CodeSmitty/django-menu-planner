export const inputFormData = {
  entre: {
    elementType: "input",
    serviceType: "entre",
    elementConfig: {
      type: "text",
      placeholder: "entre",
    },
    value: "",
    checkbox: {
      is_vegetarian: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_vegetarian",
          type: "checkbox",
        },
      },
      is_gluten_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_gluten_free",
          type: "checkbox",
        },
        isChecked: false,
      },
      is_dairy_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_dairy_free",
          type: "checkbox",
        },
        isChecked: false,
      },
    },
  },
  sideOne: {
    elementType: "input",
    serviceType: "side",
    elementConfig: {
      type: "text",
      placeholder: "side one",
    },
    value: "",
    checkbox: {
      is_vegetarian: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_vegetarian",
          type: "checkbox",
        },
      },
      is_gluten_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_gluten_free",
          type: "checkbox",
        },
      },
      is_dairy_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_dairy_free",
          type: "checkbox",
        },
      },
    },
  },
  sideTwo: {
    elementType: "input",
    serviceType: "side",
    elementConfig: {
      type: "text",
      placeholder: "side two",
    },
    value: "",
    checkbox: {
      is_vegetarian: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_vegetarian",
          type: "checkbox",
        },
      },
      is_gluten_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_gluten_free",
          type: "checkbox",
        },
      },
      is_dairy_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_dairy_free",
          type: "checkbox",
        },
      },
    },
  },
  description: {
    elementType: "input",
    serviceType: "other",
    elementConfig: {
      type: "text",
      placeholder: "description",
    },
    value: "",
    checkbox: {
      is_vegetarian: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_vegetarian",
          type: "checkbox",
        },
      },
      is_gluten_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_gluten_free",
          type: "checkbox",
        },
      },
      is_dairy_free: {
        elementType: "checkbox",
        elementConfig: {
          name: "is_dairy_free",
          type: "checkbox",
        },
      },
    },
  },
};
