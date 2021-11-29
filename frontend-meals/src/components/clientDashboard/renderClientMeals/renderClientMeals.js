import React, { useEffect, useState } from "react";
import moment from "moment";
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";

const RenderMeals = ({ date, serviceType, dayIndex, formArray, meals }) => {
  useEffect(() => {}, [meals]);

  const day = moment(date).format("YYYY-MM-DD");
  const data = meals
    ? meals?.results.filter((item, index) => {
        return item?.date === day && item?.type.toLowerCase() === serviceType;
      })
    : null;

  const mealData = data
    ? data.map((item, i) => {
        return item.items.map((meal) => {
          return (
            <div
              className="mealsContainer"
              key={meal.id}
              style={{
                border:
                  meal?.type === "entre"
                    ? "1px solid green"
                    : "1px solid yellow",
              }}
                >
              <div className="meal_item_container">
                <h3 className="meal_items">
                  {meal?.type === "entre" ? meal?.name : null}
                </h3>
                <h4 className="meal_items">
                  {meal?.type === "side" ? meal?.name : null}
                </h4>
                <h5 className="meal_items">
                  {meal?.type === "other" ? meal?.name : null}
                </h5>
              </div>
              <div className="diets_logo_container">
                {meal?.is_vegetarian ? (
                  <img
                    className="diets-imgs"
                    alt="vegetarian icon"
                    src={vegLogo}
                  />
                ) : null}
                {meal?.is_gluten_free ? (
                  <img
                    className="diets-imgs"
                    alt="vegetarian icon"
                    src={glutenLogo}
                  />
                ) : null}
                {meal?.is_dairy_free ? (
                  <img
                    className="diets-imgs"
                    alt="vegetarian icon"
                    src={dairyFree}
                  />
                ) : null}
              </div>
            </div>
          );
        });
      })
    : null;
  return <div>{mealData}</div>;
};

export default RenderMeals;
