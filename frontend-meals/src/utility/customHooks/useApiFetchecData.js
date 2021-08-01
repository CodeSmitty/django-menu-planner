import React, { useState } from "react";
import firebase from "../firebase.utility";
import { handleMomentDate } from "../utility.functions";
import DisplayMealService from "../../components/displayMealService/DisplayMealService";
import { useAuthStore } from "../reducers/auth";
import axios from "axios";

const useFetchedDataForm = (currentWeekstart, currentWeekEnd) => {
  const db = () => firebase.database();
  const [currentMeals, setCurrentMeals] = useState();
  const [retrievedData, setRetrievedData] = useState();
  const [retrivedDataForPreview, setRetrievedDataForPreview] = useState();
  const [state, dispatch] = useAuthStore();
  const getCurrentDaysOfWeek = () => {
    let days = [];
    let day = currentWeekstart;
    while (day <= currentWeekEnd) {
      days.push(day.toDate());
      day = day.clone().add(1, "days");
    }
    return days;
  };

  const retrieveDataForFormUpdating = async (isAuthenticated, id) => {
    let data;
    if (isAuthenticated) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/menus/${await id}/meals/?for_date=${currentWeekstart.format(
            "YYYY-MM-DD"
          )}&scope=week`
        );

        if (res.data.error) {
          console.log(res.data.error);
        } else if (res.data) {
          data = res.data.results;
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchMealData = async (isAuthenticated, id) => {
    if (isAuthenticated) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/menus/${await id}/meals/?for_date=${await currentWeekstart.format(
            "YYYY-MM-DD"
          )}&scope=week`
        );

        if (res.data.error) {
          console.log(res.data.error);
        } else if (res.data) {
          const meals = res.data.results;
          let daysOfWeek = getCurrentDaysOfWeek();
          setRetrievedDataForPreview(meals);
          const mealsArr = [];

          daysOfWeek.filter((day) => {
            const dayOfWeek = handleMomentDate(day, "YYYY-MM-DD");
            const fetchedMeals = meals
              ? Object.values(meals).filter((service) => {
                  return service.date === dayOfWeek;
                })
              : null;
            const mealsByDayOfTheWeek = {
              [dayOfWeek]: fetchedMeals,
            };
            mealsArr.push(mealsByDayOfTheWeek);
          });

          const mealsOfTheDay = mealsArr
            ? mealsArr.map((meal, i) => {
                let serviceMealsByDays;
                let mealItems;
                Object.keys(meal).forEach((key) => {
                  const dayName = handleMomentDate(
                    key,
                    "ddd"
                  ).toLocaleLowerCase();

                  const lunch =
                    meal && meal[key]
                      ? Object?.values(meal[key]).filter(
                          (lun) => lun.type === "lunch"
                        )
                      : null;

                  const dinner =
                    meal && meal[key]
                      ? Object?.values(meal[key]).filter(
                          (din) => din?.type === "dinner"
                        )
                      : null;

                  if (meal) {
                    serviceMealsByDays = {
                      [dayName]: {
                        lunch: lunch ? lunch[0] : null,
                        dinner: dinner ? dinner[0] : null,
                      },
                    };

                    const lunchStyle = {
                      background: `url(${serviceMealsByDays[dayName]?.lunch?.url}) center center / cover no-repeat`,
                      backgroundSize: "cover",
                      minHeight: "300px",
                      maxHeight: "300px",
                      imageRendering: "-webkit-optimize-contrast",
                    };
                    const dinnerStyle = {
                      background: `url(${serviceMealsByDays[dayName]?.dinner?.url}) center center / cover no-repeat`,

                      backgroundSize: "cover",
                      minHeight: "300px",
                      maxHeight: "300px",
                      imageRendering: "-webkit-optimize-contrast",
                    };

                    mealItems =
                      serviceMealsByDays[dayName]?.lunch?.items ||
                      serviceMealsByDays[dayName]?.dinner?.items ? (
                        <div key={i} className="service-wrapper">
                          {serviceMealsByDays[dayName]?.lunch?.items ? (
                            <div className="meal-wrapper">
                              <div
                                style={lunchStyle}
                                className="lunch-container-home"
                              >
                                <div className="serviceType-wrapper">
                                  <div className="serviceType">
                                    <p className="dayName">{dayName}</p>
                                  </div>
                                </div>
                                <DisplayMealService
                                  className="displayMealService-wrapper"
                                  serviceType={
                                    serviceMealsByDays[dayName]?.lunch?.type
                                  }
                                  mealData={
                                    serviceMealsByDays[dayName]?.lunch?.items
                                  }
                                  imgs={serviceMealsByDays[dayName]?.lunch?.url}
                                />
                              </div>
                            </div>
                          ) : null}
                          {serviceMealsByDays[dayName]?.dinner?.items ? (
                            <div className="meal-wrapper">
                              <div
                                className="dinner-container-home"
                                style={dinnerStyle}
                              >
                                <div className="serviceType-wrapper">
                                  <p
                                    className="serviceType"
                                    style={{ padding: "12px 2px" }}
                                  >
                                    dinner
                                  </p>
                                </div>
                                <DisplayMealService
                                  className="displayMealService-wrapper"
                                  serviceType={
                                    serviceMealsByDays[dayName]?.dinner?.type
                                  }
                                  mealData={
                                    serviceMealsByDays[dayName]?.dinner?.items
                                  }
                                  imgs={
                                    serviceMealsByDays[dayName]?.dinner?.url
                                  }
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null;
                  } else if (!meal) {
                    serviceMealsByDays = {};
                  }
                });

                return mealItems;
              })
            : null;

          setCurrentMeals(mealsOfTheDay);
        }
      } catch (err) {
        console.log(err.status);
      }
    }
  };

  const fetchedData = retrivedDataForPreview;

  return [
    fetchMealData,
    currentMeals,
    retrievedData,
    setRetrievedData,
    retrieveDataForFormUpdating,
    fetchedData,
    setRetrievedDataForPreview,
  ];
};

export default useFetchedDataForm;
