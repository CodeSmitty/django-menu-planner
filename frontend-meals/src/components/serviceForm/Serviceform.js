import React, { useState, useEffect } from "react";
import "./serviceform.style.scss";
import { useStore } from "../../utility/formOnChangeReducer";
import { useAuthStore } from "../../utility/reducers/auth";
import ImageSelector from "../imageSelector/ImageSelector";
import { inputFormData } from "../../utility/inputElementsData";
import {
  handleDateFormats,
  handleEditFromData,
  handleValue,
} from "../../utility/utility.functions";
import useFetchedDataForm from "../../utility/customHooks/useApiFetchecData";
import useApiSubmitForm from "../../utility/customHooks/useApiSubmitForm";
import Inputs from "./inputs/Inputs";
import { meals } from "../../utility/djangoApi/djangoApi";

const ServiceForm = (props) => {
  const [state, dispatch] = useStore();
  const [authState, authDispatch] = useAuthStore();
  const [menuId, setMenuId] = useState("");

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [currentWeekStart, currentWeekEnd, weekToDate, yearToDate, currMoment] =
    handleDateFormats(props.dates);

  const [dataPreview, setDataPreview] = useState();

  const [handleSubmit] = useApiSubmitForm(props, dispatch);
  const [
    fetchMealData,
    currentMeals,
    retrievedData,
    setRetrievedData,
    retrieveDataForFormUpdating,
    retrivedDataForPreview,
    setRetrievedDataForPreview,
  ] = useFetchedDataForm(currentWeekStart, currentWeekEnd);
  const [lunch, setLunch] = useState(false);
  const [dateChange, setDateChange] = useState();

  function findInputElements(dataInput) {
    let elArr = [];

    Object.keys(dataInput).forEach((el) => {
      elArr.push({
        id: el,
        serviceType: dataInput[el].serviceType,
        inputForm: dataInput[el],
      });
    });
    return elArr;
  }

  useEffect(() => {
    console.log(state)
     const mealss = state
       ? Object.values(state).filter((meal, i) => {
           return (
             meal?.type === "side" ||
             meal?.type === "entre" ||
             meal?.type === "other"
           );
         })
       : null;
    meals(authState.isAuthenticated, authDispatch).then((menuId) => {
      fetchMealData(authState.isAuthenticated, menuId);
      retrieveDataForFormUpdating(authState.isAuthenticated, menuId).then(
        (res) => {
          setDataPreview(res);
        }
      );
    });

    setDateChange(props.dates);
  }, [props.dates,state, authState.isAuthenticated]);

  function handleCheckboxChange(e, data) {
    return dispatch({
      type: data?.id?.toUpperCase(),
      payload: e,
      servType: data.id,
    });
  }

  function handleLunchDinnerCheckbox(e) {
    const existedMeals = handleEditFromData(
      props.dates,
      state,
      dataPreview,
      dispatch
    );


    handleValue(e, existedMeals, dispatch, state);
  }

  const handleInputTextChange = (e, data, i) => {
    dispatch({
      type: data.id.toUpperCase() + "_TEXT",
      payload: e.target.value,
      servType: data.id,
      serviceType: data.serviceType,
    });
  };
  //retrievedData ? existedMeals? existedMeals[x.id] :state[x.id].value: state[x.id].value
  let findInputs = findInputElements(inputFormData);

  let mapInputs = findInputs.map((x, i) => {
    return (
      <div key={`entre${i}`} className="form-container">
        <div className="entre-form">
          <Inputs
            elementConfig={x.inputForm.elementConfig}
            value={state[x.id]?.name}
            name={"entre.value"}
            elType={x.inputForm.elementType}
            changed={(event) => handleInputTextChange(event, x, i)}
            className="input-text"
          />
        </div>

        <div key={`diets${i}`} className="diets-checkbox">
          <Inputs
            elType={x.inputForm.checkbox?.is_vegetarian?.elementType}
            elementConfig={x.inputForm.checkbox?.is_vegetarian?.elementConfig}
            changed={(event) => handleCheckboxChange(event.target.name, x)}
            checked={state[x.id]?.is_vegetarian}
          />
          <label>veg</label>
          <Inputs
            elType={x.inputForm.checkbox?.is_gluten_free?.elementType}
            elementConfig={x.inputForm.checkbox?.is_gluten_free?.elementConfig}
            changed={(event) => handleCheckboxChange(event.target.name, x)}
            checked={state[x.id]?.is_gluten_free}
          />
          <label>gluten</label>
          <Inputs
            elType={x.inputForm.checkbox?.is_dairy_free?.elementType}
            elementConfig={x.inputForm.checkbox?.is_dairy_free?.elementConfig}
            checked={state[x.id]?.is_dairy_free}
            changed={(event) => handleCheckboxChange(event.target.name, x)}
          />
          <label>dairy</label>
        </div>
      </div>
    );
  });

  function handleChange(e) {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validationType = ["image/gif", "image/jpeg", "image/png"];

      if (validationType.includes(fileType)) {
        setError("");
        setImage(file);
      }
    }
  }

  return (
    <div className="container-box">
      <form
        onSubmit={(e) => handleSubmit(e, image, menuId)}
        className="form"
        action=""
      >
        <div className="serviceType-checkboxes">
          <input
            className="svc-type"
            onChange={(e) => {
              handleLunchDinnerCheckbox(e);
            }}
            checked={state?.serviceType?.lunch}
            name="lunch"
            type="checkbox"
          />
          <label>Lunch</label>
          <input
            className="svc-type"
            onChange={(e) => handleLunchDinnerCheckbox(e)}
            checked={state?.serviceType?.dinner}
            name="dinner"
            type="checkbox"
          />
          <label>Dinner</label>
        </div>
        {mapInputs}
        <div className="btn-uploader-wrapper">
          <ImageSelector
            error={error}
            handleChange={handleChange}
            className="uploader"
          />
          <button
            className="submit-btn"
            onClick={(e) => {
              state?.serviceType?.dinner || state?.serviceType?.lunch === true
                ? handleSubmit(e, image)
                : handleSubmit(e, image);
            }}
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
