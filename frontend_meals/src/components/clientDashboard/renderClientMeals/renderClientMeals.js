import React, { useEffect, useState } from "react";
import moment from "moment";
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";
import Meals from "../../menu/meals/Meals";
import "./renderClientMeals.scss";

const RenderMeals = ({ date, serviceType, dayIndex, formArray, meals }) => {
  useEffect(() => {}, [meals]);

  const day = moment(date).format("YYYY-MM-DD");
  const data = meals
    ? meals?.results.filter((item, index) => {
        return item?.date === day && item?.type.toLowerCase() === serviceType;
      })
    : null;

  const meal = data
    ? data.map((item, i) => {
        return item.items.map((meal) => {
          return (
            <div
              className="clientMealsContainer"
              key={meal.id}
              style={{
                border:
                  meal?.type === "entre"
                    ? "1px solid green"
                    : "1px solid yellow",
              }}
            >
              {meal?.url ? (
                <div className="client_meal_image_container">
                  {meal?.url ? (
                    <img
                      style={{ maxWidth: "100%" }}
                      className="client_meal_image"
                      src={meal?.url}
                      alt={meal?.name}
                    />
                  ) : null}
                </div>
              ) : null}
              <div className="client_meal_item_container">
                {meal?.type === "entre" ? (
                  <h4 className="client_meal_items">{meal?.name}</h4>
                ) : null}

                {meal?.type === "side" ? (
                  <h4 className="client_meal_items">{meal?.name}</h4>
                ) : null}

                {meal?.type === "other" ? (
                  <h4 className="client_meal_items">{meal?.name}</h4>
                ) : null}
              </div>
              <div className="client_diets_logo_container">
                {meal?.is_vegetarian ? (
                  <img
                    className="client_diets-imgs"
                    alt="vegetarian icon"
                    src={vegLogo}
                  />
                ) : null}
                {meal?.is_gluten_free ? (
                  <img
                    className="client_diets-imgs"
                    alt="vegetarian icon"
                    src={glutenLogo}
                  />
                ) : null}
                {meal?.is_dairy_free ? (
                  <img
                    className="client_diets-imgs"
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
  return <div className="client_meal_wrapper">{meal}</div>;
};

export default RenderMeals;
