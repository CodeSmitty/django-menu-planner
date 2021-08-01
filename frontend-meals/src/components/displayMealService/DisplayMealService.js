import React from "react";
import "./displayMealService.style.scss";
import vegLogo from "../../assets/vegetarianIcon.png"
import glutenLogo from "../../assets/glutenFree.png"
import dairyFree from "../../assets/dairyfree.png"

// //const vegLogo = require("../../assets/vegetarianIcon.png");
// const glutenLogo = require("../../assets/glutenFree.png");
// const dairyFree = require("../../assets/dairyfree.png");



const DisplayMealService = (props) => {
  const imageMap = {
    veg: vegLogo,
    glut: glutenLogo,
    dairy: dairyFree,
  };

  let imageUrl = props.imgs;
  const style = {
    background: `url(${imageUrl})`,
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center",
  };


  const entre = {
    value: props.mealData[0]?.type ==='entre' ? props.mealData[0].name : null,
    glut:
      props.mealData && props.mealData[0]
        ? props.mealData[0].is_gluten_free
        : null,
    veg:
      props.mealData && props.mealData[0]
        ? props.mealData[0]?.is_vegetarian
        : null,
    dairy:
      props.mealData && props.mealData[0]
        ? props.mealData[0]?.is_dairy_free
        : null,
  };



  const sideOne = {
    value:
      props?.mealData[1]?.type ==='side' ? props.mealData[1].name : null,
    glut:
      props.mealData && props.mealData[1]
        ? props.mealData[1].is_gluten_free
        : null,
    veg:
      props.mealData && props.mealData[1]
        ? props.mealData[1]?.is_vegetarian
        : null,
    dairy:
      props.mealData && props.mealData[1]
        ? props.mealData[1]?.is_dairy_free
        : null,
  };

  const sideTwo = {
    value:
      props?.mealData && props?.mealData[2]?.type === 'side' ? props.mealData[2]?.name: null,
    glut:
      props.mealData && props.mealData[2]
        ? props.mealData[2]?.is_gluten_free
        : null,
    veg:
      props.mealData && props.mealData[2]
        ? props.mealData[2]?.is_vegetarian
        : null,
    dairy:
      props.mealData && props.mealData[2]
        ? props.mealData[2]?.is_dairy_free
        : null,
  };

  const arrReducer = (obj) =>
    obj
      ? Object.entries(obj).reduce((accumulator, [k, v]) => {
          if (k !== "value" && v) {
            accumulator.push(k);
          }
          return accumulator;
        }, [])
      : null;

  const entreItems = arrReducer(entre);

  const sideOneItems = arrReducer(sideOne);
  const sideTwoItems = arrReducer(sideTwo);

  return (
    <div className={props.className}>
      <div className="meal-details-wrapper">
        <div className="entre-container">
          <p
            onClick={(e) => {
              console.log(e.target);
            }}
            className="entre-text home-entre-text"
          >
          {entre?.value}
          </p>
          <div className="diets-imgs-container">
            {entreItems?.map((e, i) => {
              return (
                <img className="diets-imgs" key={i} src={imageMap[e]} alt={e} />
              );
            })}
          </div>
        </div>
        <div className="sideOne-container">
          <p className="sideOne-text home-sideOne-text">
            {sideOne?.value}
          </p>
          <div className="diets-imgs-container">
            {sideOneItems?.map((e, i) => (
              <img className="diets-imgs" key={i} src={imageMap[e]} alt="e" />
            ))}
          </div>
        </div>
        <div className="sideTwo-container">
          <p className="sideTwo-text home-sideTwo-text">
            {sideTwo?.value}
          </p>
          <div className="diest-imgs-container">
            {sideTwoItems?.map((e, i) => (
              <img className="diets-imgs" key={i} src={imageMap[e]} alt="e" />
            ))}
          </div>
        </div>
        <div className="description-container">
          <p className="description-text home-description-text">
            {props.mealData ? props?.mealData[3]?.description : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayMealService;
