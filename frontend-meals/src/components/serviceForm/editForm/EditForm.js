import React, {useState} from 'react'
import { useFormikContext, useFormik } from "formik";
import ImageSelector from '../../imageSelector/ImageSelector';

const EditForm = ({mealData, handleEdit}) =>{
     const [imageFile, setImageFile] = useState();
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        id:"",
        mealItem: "",
        is_vegetarian: false,
        is_gluten_free: false,
        is_dairy_free: false,
        mealType: "",
        img: "",
      },
      onSubmit: (actions, values) => {},
    });

    const handleSubmit = (e) =>{
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
        let formData = {
           id:mealData?.id, 
          mealItem: formik.values.mealItem,
          mealType: formik.values.mealType,
          is_vegetarian: formik.values.is_vegetarian,
          is_dairy_free: formik.values.is_dairy_free,
          is_gluten_free: formik.values.is_gluten_free,
          img: imageFile,
        };
        handleEdit(formData)
    }

    return (
      <>
        <form>
          <div className="form-field-wrapper">
            <div className="meal-item-container">
              <input
                name="mealItem"
                value={formik.values.mealItem}
                onChange={formik.handleChange}
                placeholder={mealData?.name}
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
              <ImageSelector
                handleChange={(e) => {
                  setImageFile(e.currentTarget.files[0]);
                }}
              />
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
      </>
    );
}

export default EditForm;