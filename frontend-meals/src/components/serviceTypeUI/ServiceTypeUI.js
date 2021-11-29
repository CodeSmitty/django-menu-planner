import React from "react";
import moment from "moment";
import FormFields from "../serviceForm/formfields/Formfields";

const ServiceTypeUI = ({ formArray, dayIndex, day, servType, currentMeals}) => {
  const date = moment(day).format("YYYY-MM-DD");
  const serviceType = formArray
    ? formArray.map((element, i) => {
        if (
          element.day_index === dayIndex &&
          servType === element.serviceType
        ) {
          return (
            <>
              <FormFields
                key={`dayIndex${i}`}
                menu={1}
                date={date}
                serviceType={element.serviceType.toUpperCase()}
                currentMeals={currentMeals}
              />
            </>
          );
        }
      })
    : null;

  return (
    <>
      {serviceType}
    </>
  );
};  

export default ServiceTypeUI; 
