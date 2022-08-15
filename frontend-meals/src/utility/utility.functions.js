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
    const lunchMealId = lunchMeals[0] && lunchMeals[0]?.id;
    const getMealsbyType = (data, type) =>
      data ? data.filter((ents, i) => ents.type === type) : null;

    const lunchEntre = getMealsbyType(doesItexist, "entre");
    const lunchSides = getMealsbyType(doesItexist, "side");
    const lunchDescription = getMealsbyType(doesItexist, "other");
    console.log(lunchEntre);

    activeService = {
      id: lunchMealId,
      entre: {
        name: lunchEntre && lunchEntre[0] ? lunchEntre[0]?.name : "",
        type: lunchEntre && lunchEntre[0] ? lunchEntre[0]?.type : "",
        is_vegetarian:
          lunchEntre && lunchEntre[0] ? lunchEntre[0]?.is_vegetarian : false,
        is_gluten_free:
          lunchEntre && lunchEntre[0] ? lunchEntre[0]?.is_gluten_free : false,
        is_dairy_free:
          lunchEntre && lunchEntre[0] ? lunchEntre[0]?.is_dairy_free : false,
      },
      sideOne: {
        name: lunchSides && lunchSides[0] ? lunchSides[0]?.name : "",
        type: lunchSides && lunchSides[0] ? lunchSides[0]?.type : "",
        is_vegetarian:
          lunchSides && lunchSides[0] ? lunchSides[0]?.is_vegetarian : false,
        is_gluten_free:
          lunchSides && lunchSides[0] ? lunchSides[0]?.is_gluten_free : false,
        is_dairy_free:
          lunchSides && lunchSides[0] ? lunchSides[0]?.is_dairy_free : false,
      },
      sideTwo: {
        name: lunchSides && lunchSides[1] ? lunchSides[1]?.name : "",
        type: lunchSides && lunchSides[1] ? lunchSides[1]?.type : "",
        is_vegetarian:
          lunchSides && lunchSides[1] ? lunchSides[1]?.is_vegetarian : false,
        is_gluten_free:
          lunchSides && lunchSides[1] ? lunchSides[1]?.is_gluten_free : false,
        is_dairy_free:
          lunchSides && lunchSides[1] ? lunchSides[1]?.is_dairy_free : false,
      },
      description: {
        name:
          lunchDescription && lunchDescription[0]
            ? lunchDescription[0]?.name
            : false,
        type:
          lunchDescription && lunchDescription[0]
            ? lunchDescription[0]?.type
            : false,
        is_vegetarian:
          lunchDescription && lunchDescription[0]
            ? lunchDescription[0]?.is_vegetarian
            : false,
        is_gluten_free:
          lunchDescription && lunchDescription[0]
            ? lunchDescription[0]?.is_gluten_free
            : false,
        is_dairy_free:
          lunchDescription && lunchDescription[0]
            ? lunchDescription[0]?.is_dairy_free
            : false,
      },
    };

    console.log(activeService);
    let dinnerMeals = data
      ? Object.values(data).filter((ser) => {
          return localMealId === ser.date && ser.type === "dinner";
        })
      : "";
    const doesDinnerExist = dinnerMeals[0] && dinnerMeals[0]?.items;
    const dinnerMealId = dinnerMeals[0] && dinnerMeals[0]?.id;

    const dinnerEntre = getMealsbyType(doesDinnerExist, "entre");
    const dinnerSides = getMealsbyType(doesDinnerExist, "side");
    const dinnerDescription = getMealsbyType(doesDinnerExist, "other");

    activeDinnerService = {
      id: dinnerMealId,
      entre: {
        name: dinnerEntre && dinnerEntre[0] ? dinnerEntre[0]?.name : "",
        type: dinnerEntre && dinnerEntre[0] ? dinnerEntre[0]?.type : "",
        is_vegetarian:
          dinnerEntre && dinnerEntre[0] ? dinnerEntre[0]?.is_vegetarian : false,
        is_gluten_free:
          dinnerEntre && dinnerEntre[0]
            ? dinnerEntre[0]?.is_gluten_free
            : false,
        is_dairy_free:
          dinnerEntre && dinnerEntre[0] ? dinnerEntre[0]?.is_dairy_free : false,
      },
      sideOne: {
        name: dinnerSides && dinnerSides[0] ? dinnerSides[0]?.name : "",
        type: dinnerSides && dinnerSides[0] ? dinnerSides[0]?.type : "",
        is_vegetarian:
          dinnerSides && dinnerSides[0] ? dinnerSides[0]?.is_vegetarian : "",
        is_gluten_free:
          dinnerSides && dinnerSides[0] ? dinnerSides[0]?.is_gluten_free : "",
        is_dairy_free:
          dinnerSides && dinnerSides[0] ? dinnerSides[0]?.is_dairy_free : "",
      },
      sideTwo: {
        name: dinnerSides && dinnerSides[1] ? dinnerSides[1]?.name : "",
        type: dinnerSides && dinnerSides[1] ? dinnerSides[1]?.type : "",
        is_vegetarian:
          dinnerSides && dinnerSides[1] ? dinnerSides[1]?.is_vegetarian : "",
        is_gluten_free:
          dinnerSides && dinnerSides[1] ? dinnerSides[1]?.is_gluten_free : "",
        is_dairy_free:
          dinnerSides && dinnerSides[1] ? dinnerSides[1]?.is_dairy_free : "",
      },
      description: {
        name:
          dinnerDescription && dinnerDescription[0]
            ? dinnerDescription?.name
            : "",
        type:
          dinnerDescription && dinnerDescription[0]
            ? dinnerDescription?.type
            : "",
        is_vegetarian:
          dinnerDescription && dinnerDescription[0]
            ? dinnerDescription?.is_vegetarian
            : "",
        is_gluten_free:
          dinnerDescription && dinnerDescription[0]
            ? dinnerDescription?.is_gluten_free
            : "",
        is_dairy_free:
          dinnerDescription && dinnerDescription[0]
            ? dinnerDescription?.is_dairy_free
            : "",
      },
    };

    return [activeService, activeDinnerService];
  }
};

export function handleValue(e, existedMeals, dispatch, state) {
  if (e.target.name === "lunch") {
    Object.keys(state).forEach((key) => {
      console.log(existedMeals);
      dispatch({
        type: "LUNCH",
        payload: e.target.name,
        loadedData: !existedMeals ? "" : existedMeals[0][key],
        mealType: !existedMeals ? "" : existedMeals[0][key]?.type,
        servType: key,
        mealId: !existedMeals ? "" : existedMeals[0].id,
      });
    });
  } else if (e.target.name === "dinner") {
    Object.keys(state).forEach((key) => {
      dispatch({
        type: "DINNER",
        payload: e.target.name,
        loadedData: !existedMeals ? "" : existedMeals[1][key],
        servType: key,
        mealId: !existedMeals ? "" : existedMeals[1].id,
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

// R & H Constructions Inc is a general construction and home remodeling company in the Greater Lafayette Area. From exterior construction to handyman services. Fully Licensed and Insured. We are ready to tackle any job you have for us.  Contact us and get a quote today!
