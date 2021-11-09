import React from 'react'
import { useStore } from '../../../utility/formOnChangeReducer';
import moment from 'moment'
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";

const LunchMeals = ({date, serviceType, dayIndex, formArray}) =>{
    const [state, dispatch] = useStore()

    const renderedData =state?  Object.values(state?.items).map((item, index)=>{
        const day = moment(date).format('YYYY-MM-DD');
        
        if(state.date === day && state.type === serviceType  ){
             
            return (
              <li>
                  <div key={index}>
                    {item.type === "entre" ? <h3>{item.name}</h3> : null}
                    {item.type === "side" || item?.type ===  "other" ? <h4>{item?.name}</h4> : null}
                    {item?.is_vegetarian ? (
                      <img
                        className="diets-imgs"
                        src={vegLogo}
                        alt="vegetarian icon"
                      />
                    ) : null}
                    {item?.is_gluten_free ? (
                      <img
                        className="diets-imgs"
                        src={glutenLogo}
                        alt="gluten free icon"
                      />
                    ) : null}
                    {item?.is_dairy_free ? (
                      <img
                        className="diets-imgs"
                        src={dairyFree}
                        alt="dairy free icon"
                      />
                    ) : null}
                  </div>
              </li>
            );
        }
       
    }):null;
    return(<div>
       {renderedData}
    </div>)
}

export default LunchMeals;