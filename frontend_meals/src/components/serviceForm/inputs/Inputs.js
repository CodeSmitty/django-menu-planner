import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";


const Inputs = (props) => {
  let inputElement;
  switch (props.elType) {
    case "input":
      inputElement = (
        <div className="input-element-wrapper">
          <input
            type="text"
            className={props.className}
            value={props.value}
            name={props.name}
            onChange={props.changed}
            placeholder={props.placeholder}
            {...props.elementConfig}
          />
        </div>
      );
      break;
    case "checkbox":
      inputElement = (
        <div className="input-checkbox-wrapper">
          <input
            type="checkbox"
            name={props.name}
            className={props.className}
            onChange={props.changed}
            checked={props.checked}
            {...props.elementConfig}
          />
        </div>
      );
      break;
    case 'radio':
      inputElement = (
        <div className="input-checkbox-wrapper">
          <input
            name={props.name}
            value={props.value}
            type="radio"
            className={props.className}
            onChange={props.changed}
            checked={props.checked}
            {...props.elementConfig}
          />
        </div>
      );
        break;
    default:
      inputElement = (
        <input
          className={props.className}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
  }

  return inputElement;
};

export default Inputs;
