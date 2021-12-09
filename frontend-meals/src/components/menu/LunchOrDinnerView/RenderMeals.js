import React, { useEffect, useState } from "react";
import moment from "moment";
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";
import edit from "../../../assets/edit.png";
import trash from "../../../assets/trash.png";
import "./rendermeals.scss";

const RenderMeals = ({ date, serviceType, dayIndex, formArray, meals, handleClick }) => {
  useEffect(() => {
  }, [meals]);

  

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
                {meal?.url ? (
                  <img
                    className="meal-image"
                    src={meal?.url}
                    alt={meal?.name}
                  />
                ) : null}
                
                  {meal?.type === "entre" ? <h3 className="meal_items">{meal?.name}</h3> : null}
                
                
                  {meal?.type === "side" ? <h4 className="meal_items">{meal?.name}</h4> : null}
                
               
                  {meal?.type === "other" ? <h5 className="meal_items">{meal?.name}</h5> : null}
                
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
              <div className="edit-delete-container">
                <div className="edit-del-icon">
                  <button>
                    <img alt="edit icon" src={edit} />
                  </button>
                </div>
                <div className="edit-del-icon">
                  <button onClick={(e) => handleClick(e, meal?.id)}>
                    <img alt="delete icon" src={trash} />
                  </button>
                </div>
              </div>
            </div>
          );
        });
      })
    : null;
  return <div>{mealData}</div>;
};

export default RenderMeals;
