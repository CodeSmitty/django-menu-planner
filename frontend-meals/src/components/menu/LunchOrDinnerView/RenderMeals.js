import React, {useEffect} from 'react'
import { useStore } from '../../../utility/formOnChangeReducer';
import moment from 'moment'
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";
import useFetchedDataForm from "../../../utility/customHooks/useApiFetchecData"


const RenderMeals = ({date, serviceType, dayIndex, formArray}) =>{
    const [state, dispatch] = useStore()
    const [fetchData, currentMeals] = useFetchedDataForm()

    

    useEffect(() => {
        fetchData(date,serviceType)
    },[])

    return(<div>
       {/* {renderedData} */}
       {currentMeals}
    </div>)
}

export default RenderMeals;