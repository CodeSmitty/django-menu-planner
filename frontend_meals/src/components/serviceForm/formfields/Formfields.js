import React, { useState, useEffect } from "react";
import { useFormikContext, useFormik } from "formik";
import { formCreatorObject } from "../../../utility/formJsonBase/formJsonBase";
import Inputs from "../inputs/Inputs";
import "./formfields.scss";
import { useStore } from "../../../utility/formOnChangeReducer";
import useSubmitForm from "../../../utility/customHooks/useApiSubmitForm";
import ImageSelector from "../../imageSelector/ImageSelector";


const FormFields = ({ ...options }) => {
  const [state, dispatch] = useStore();
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mealItem: "",
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      mealType: "",
      img:""
    },
    onSubmit: (actions, values) => {},
  });

  const [handleFormSubmit] = useSubmitForm(options?.date);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    let formData = {
      type: options?.serviceType,
      serviceType: options.serviceType?.toLowerCase(),
      date: options.date,
      mealItem: formik.values.mealItem,
      mealType: formik.values.mealType,
      menu: options.menu,
      is_vegetarian: formik.values.is_vegetarian,
      is_dairy_free: formik.values.is_dairy_free,
      is_gluten_free: formik.values.is_gluten_free,
      img:imageFile
    };

    setShowForm(false);

    handleFormSubmit(e, formData, options.currentMeals);
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-field-wrapper">
            <div className="meal-item-container">
              <input
                name="mealItem"
                value={formik.values.mealItem}
                onChange={formik.handleChange}
                autoFocus
                required
              />
            </div>
            <div className="service-type-container">
              <input
                onChange={formik.handleChange}
                name="mealType"
                value="entre"
                type="radio"
                required
                
              />
              <label>Entre</label>
              <input
                onChange={formik.handleChange}
                name="mealType"
                value="side"
                type="radio"
                required
              />
              <label>side</label>
              <input
                onChange={formik.handleChange}
                name="mealType"
                value="other"
                type="radio"
                required
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
            <di>
              <ImageSelector handleChange={(e)=>{
                setImageFile( e.currentTarget.files[0]) 
              }} />
            </di>
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
    </>
  );
};

export default FormFields;
