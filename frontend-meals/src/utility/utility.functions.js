import moment from "moment";
import FireApi from "./rest.classes";

export const handleMomentDate = (key, formats) => {
  return moment(key).format(formats);
};

export const handleFormFetchedData = (date, fetchFuct) => {
  let newData;
  let currentWeekStart = moment(date).startOf("week");
  let currentWeekEnd = moment(date).endOf("week");
  const weekToDate = `week_0${moment(currentWeekStart).week()}`;
  const yearToDate = moment(currentWeekStart).format("YYYY");

  let data = FireApi.get(`mealService/${yearToDate}/${weekToDate}`).then(
    (data) => (newData = data)
  );

  return data;
};

export const handleDateFormats = (date) => {
  let currentWeekStart = moment(date).startOf("week");
  let currentWeekEnd = moment(date).endOf("week");
  const weekToDate = `week_0${moment(currentWeekStart).week()}`;
  const yearToDate = moment(currentWeekStart).format("YYYY");
  const currMoment = moment(date);

  return [currentWeekStart, currentWeekEnd, weekToDate, yearToDate, currMoment];
};

export const handleEditFromData = (date, state, data) => {
  let activeService = "";
  let activeDinnerService = "";
  if (data) {
    let localMealId = handleMomentDate(date, "YYYY-MM-DD");
    let lunchMeals = data
      ? Object.values(data).filter((ser) => {
          return (
            localMealId === ser.date &&
            ser.type === "lunch" &&
            ser.items !== undefined
          );
        })
      : "";

    const doesItexist = lunchMeals[0] && lunchMeals[0]?.items;
    const getMealsbyType = (data, type) =>
      data ? data.filter((ents, i) => ents.type === type) : null;

    const lunchEntre = getMealsbyType(doesItexist, "entre");
    const lunchSides = getMealsbyType(doesItexist, "side");
    const lunchDescription = getMealsbyType(doesItexist, "other");

    activeService = {
      entre: lunchEntre && lunchEntre[0] ? lunchEntre[0]?.name : "",
      sideOne: lunchSides && lunchSides[0] ? lunchSides[0]?.name : "",
      sideTwo: lunchSides && lunchSides[1] ? lunchSides[1]?.name : "",
      description:
        lunchDescription && lunchDescription[0]
          ? lunchDescription[0]?.name
          : "",
    };
    let dinnerMeals = data
      ? Object.values(data).filter((ser) => {
          return localMealId === ser.date && ser.type === "dinner";
        })
      : "";
    const doesDinnerExist = dinnerMeals[0] && dinnerMeals[0]?.items;

    const dinnerEntre = getMealsbyType(doesDinnerExist, "entre");
    const dinnerSides = getMealsbyType(doesDinnerExist, "side");
    const dinnerDescription = getMealsbyType(doesDinnerExist, "other");

    activeDinnerService = {
      entre: dinnerEntre && dinnerEntre[0] ? dinnerEntre[0]?.name : "",
      sideOne: dinnerSides && dinnerSides[0] ? dinnerSides[0]?.name : "",
      sideTwo: dinnerSides && dinnerSides[1] ? dinnerSides[1]?.name : "",
      description:
        dinnerDescription && dinnerDescription[0]
          ? dinnerDescription?.name
          : "",
    };

    return [activeService, activeDinnerService];
  }
};

export function handleValue(e, existedMeals, dispatch, state) {
  if (e.target.name === "lunch") {
    Object.keys(state).forEach((key) => {
      dispatch({
        type: "LUNCH",
        payload: e.target.name,
        loadedData: !existedMeals ? "" : existedMeals[0][key],
        servType: key,
      });
    });
  } else if (e.target.name === "dinner") {
    Object.keys(state).forEach((key) => {
      dispatch({
        type: "DINNER",
        payload: e.target.name,
        loadedData: !existedMeals ? "" : existedMeals[1][key],
        servType: key,
      });
    });
  }
}

export const handleIsValueOrObject = (obj) => {
  return Object.values(obj).filter((val) => {
    if (typeof val === "function") {
      return val.call();
    } else {
      return val;
    }
  });
};
