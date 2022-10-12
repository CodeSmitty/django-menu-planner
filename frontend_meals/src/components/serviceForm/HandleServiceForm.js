import React from 'react';
import WeeklyMenuView from '../menu/WeekMenuView';


const HandleServiceForm = ({calendarDates}) =>{

     
    
    return(<div>
      <WeeklyMenuView calendarDates={calendarDates} />
    </div>)
}

export default HandleServiceForm;