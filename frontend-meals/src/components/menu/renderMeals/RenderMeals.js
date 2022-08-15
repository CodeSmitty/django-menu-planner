import React, { useEffect, useState } from "react";
import Audio from 'react-loader-spinner';
import moment from "moment";
import EditForm from "../../serviceForm/editForm/EditForm";
import "./rendermeals.scss";
import Meals from "../meals/Meals";

const RenderMeals = ({ date, serviceType, meals, onDelete, onEdit }) => {
  useEffect(() => {}, [meals]);
  const [showForm, setShowForm] = useState({
    show: false,
    itemId: null,
    mealId: null,
    eventData: null,
  });

  const [editedMeal, setEditedMeal] = useState(null);
  const [editedMealData, setEditedMealData] = useState();

  const isEditing = editedMeal !== null;

  if (isEditing) {
    function handleEditCompletion(editingData) {
      console.log(editingData);
      onEdit(editingData);
      setEditedMeal(null);
    }

    return (
      <div>
        <EditForm
          handleEdit={handleEditCompletion}
          mealData={editedMealData ? editedMealData : null}
        />
      </div>
    );
  }

  function handleEdit(e, mealId, itemId, meal) {
    console.log(meal);
    setEditedMeal(meal);
    setEditedMealData(meal);
  }

  const day = moment(date).format("YYYY-MM-DD");

  const data = meals
    ? meals?.results.filter((item, index) => {
        return item?.date === day && item?.type.toLowerCase() === serviceType;
      })
    : null;
  const mealData = data
    ? data.map((item, i) => {
        return item.items.map((meal) => {
          console.log(meal);
          return (
            <Meals
              itemData={item}
              mealData={meal}
              handleEdit={handleEdit}
              onDelete={onDelete}
            />
          );
        });
      })
    : null;

  return <div>{mealData}</div>;
};

export default RenderMeals;
