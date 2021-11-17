import React, { useState, useEffect } from "react";
import { useFormikContext, useFormik } from "formik";
import { formCreatorObject } from "../../../utility/formJsonBase/formJsonBase";
import Inputs from "../inputs/Inputs";
import "./formfields.scss";
import { useStore } from "../../../utility/formOnChangeReducer";
import useSubmitForm from "../../../utility/customHooks/useApiSubmitForm";

const FormFields = ({ ...options }) => {
  const [state, dispatch] = useStore();
  const [showForm, setShowForm] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mealItem: "",
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      mealType: "",
    },
    onSubmit: (actions, values) => {},
  });

  const [handleFormSubmit] = useSubmitForm(options?.date, dispatch);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    formik.setFieldValue(name, value);

    const formData = {
      type: options.serviceType,
      date: options.date,
      mealItem: formik.values.mealItem,
      mealType: formik.values.mealType,
      menu: options.menu,
      is_vegetarian: formik.values.is_vegetarian,
      is_dairy_free: formik.values.is_dairy_free,
      is_gluten_free: formik.values.is_gluten_free,
    };
  
    dispatch({type:"MEALS", payload:formData})

    setShowForm(false);

    handleFormSubmit(e, formData);
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-field-wrapper">
            <div className="meal-item-container">
              <input
                name="mealItem"
                value={formik.values.mealItem}
                onChange={formik.handleChange}
              />
            </div>
            <div className="service-type-container">
              <input
                onChange={formik.handleChange}
                name="mealType"
                value="entre"
                type="radio"
              />
              <label>Entre</label>
              <input
                onChange={formik.handleChange}
                name="mealType"
                value="side"
                type="radio"
              />
              <label>side</label>
              <input
                onChange={formik.handleChange}
                name="mealType"
                value="other"
                type="radio"
              />
              <label>other</label>
            </div>
            <div className="dietType-container">
              <input
                onChange={formik.handleChange}
                name="is_vegetarian"
                type="checkbox"
              />
              <label>vegetarian</label>
              <input
                onChange={formik.handleChange}
                name="is_gluten_free"
                type="checkbox"
              />
              <label>gluten free</label>
              <input
                onChange={formik.handleChange}
                name="is_dairy_free"
                type="checkbox"
              />
              <label>dairy_free</label>
            </div>
            <div className="submit-btn-container">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                ✔
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default FormFields;
