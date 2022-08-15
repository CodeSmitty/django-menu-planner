import React from "react";
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";
import edit from "../../../assets/edit.png";
import trash from "../../../assets/trash.png";
import "./meals.scss";

const Meals = ({ itemData, mealData, onDelete, handleEdit }) => (
  <div
    className="mealsContainer"
    key={mealData.id}
    style={{
      border:
        mealData?.type === "entre" ? "1px solid green" : "1px solid yellow",
    }}
  >
    <div className="meal_item_container">
      {mealData?.url ? (
        <img className="meal-image" src={mealData?.url} alt={mealData?.name} />
      ) : null}

      {mealData?.type === "entre" ? (
        <h3 className="meal_items">{mealData?.name}</h3>
      ) : null}

      {mealData?.type === "side" ? (
        <h4 className="meal_items">{mealData?.name}</h4>
      ) : null}

      {mealData?.type === "other" ? (
        <h5 className="meal_items">{mealData?.name}</h5>
      ) : null}
    </div>
    <div className="diets_logo_container">
      {mealData?.is_vegetarian ? (
        <img className="diets-imgs" alt="vegetarian icon" src={vegLogo} />
      ) : null}
      {mealData?.is_gluten_free ? (
        <img className="diets-imgs" alt="vegetarian icon" src={glutenLogo} />
      ) : null}
      {mealData?.is_dairy_free ? (
        <img className="diets-imgs" alt="vegetarian icon" src={dairyFree} />
      ) : null}
    </div>
    <div className="edit-delete-container">
      <div className="edit-del-icon">
        <button
          id={itemData.id}
          onClick={(e) => {
            handleEdit(e, itemData?.id, mealData?.id, mealData);
          }}
        >
          <img alt="edit icon" src={edit} />
        </button>
      </div>
      <div className="edit-del-icon">
        <button onClick={(e) => onDelete(itemData?.id, mealData?.id)}>
          <img alt="delete icon" src={trash} />
        </button>
      </div>
    </div>
  </div>
);

export default Meals;
