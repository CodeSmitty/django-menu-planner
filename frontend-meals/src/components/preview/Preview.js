import React, { useEffect } from "react";
import moment from "moment";
import "./Preview.style.scss";
import useApiFetchecData from "../../utility/customHooks/useApiFetchecData";
import { useStore } from "../../utility/formOnChangeReducer";
import { meals } from "../../utility/djangoApi/djangoApi";
import { useAuthStore } from "../../utility/reducers/auth";

const Preview = (props) => {
  const [state, dispatch] = useStore();
  const [authState, secondDispatch] = useAuthStore();
  let currentWeekStart = moment(props.date).startOf("week");
  let currentWeekEnd = moment(props.date).endOf("week");

  const [
    fetchMealData,
    currentMeals,
    retrievedData,
    setRetrievedData,
    retrievedOnLoadData,
    retrievedDataForPreview,
    setRetrievedDataForPreview,
  ] = useApiFetchecData(currentWeekStart, currentWeekEnd);

  useEffect(() => {}, [state]);

  useEffect(() => {
    meals(authState.isAuthenticated, secondDispatch).then((res) => {
      fetchMealData(authState.isAuthenticated, res);
    });
  }, [props.date, authState.isAuthenticated]);

  return (
    <div>
      {retrievedDataForPreview ? (
        <div className="preview-service-container">{currentMeals}</div>
      ) : (
        <div>no meals</div>
      )}
    </div>
  );
};

export default Preview;
