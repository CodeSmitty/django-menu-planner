import React from 'react';
import moment from 'moment'
import FormFields from '../serviceForm/formfields/Formfields';


const ServiceTypeUI = ({formArray, dayIndex, day, servType}) =>{
     
    const date = moment(day).format("YYYY-MM-DD");
    const serviceType = formArray ? formArray.map((element, i) =>{
           
        if (element.day_index === dayIndex && servType === element.serviceType) {
          return (
            <div key={`dayIndex${i}`}>
              <FormFields menu={7} date={date} serviceType={element.serviceType.toUpperCase()} />
            </div>
          );
        }
        // if (element.day_index === `dinner${dayIndex}` && servType === 'dinner') {
        //   return (
        //     <div key={`dinner${dayIndex}${i}`}>
        //       <FormFields menu={"7"} date={date} serviceType="DINNER" />
        //     </div>
        //   );
        // }
        
    }):null;



    return(<div>{serviceType}</div>)

};

export default ServiceTypeUI;