import React, {useEffect} from 'react'
import { useStore } from '../../../utility/formOnChangeReducer';
import moment from 'moment'
import vegLogo from "../../../assets/vegetarianIcon.png";
import glutenLogo from "../../../assets/glutenFree.png";
import dairyFree from "../../../assets/dairyfree.png";
import useFetchedDataForm from "../../../utility/customHooks/useApiFetchecData"
import {meals} from "../../../utility/djangoApi/djangoApi"
import { useAuthStore } from '../../../utility/reducers/auth';


const RenderMeals = ({date, serviceType, dayIndex, formArray}) =>{
    const [state, dispatch] = useStore()
    const [authState, authDispatch] = useAuthStore()
    const [fetchData, currentMeals] = useFetchedDataForm(date)

    

    useEffect(() => {
         meals(authState.isAuthenticated, authDispatch).then((res) => {
             fetchData(date,serviceType, authState.isAuthenticated, res)
         });
        
    },[])

    return(<div>
       {/* {renderedData} */}
       {currentMeals}
    </div>)
}

export default RenderMeals;