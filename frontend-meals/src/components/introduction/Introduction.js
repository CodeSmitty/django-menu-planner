import React from 'react';
import {useAuthStore} from '../../utility/reducers/auth';


const Introduction = () =>{
    const [state, dispatch] = useAuthStore();

return(<div>
    <h1>Welcome {state.user}</h1>
    <p>Here you can see the meals for the week. If you are from a house, Please use your house login or Qr code that came your chef provided for you. </p>
    <p>Chefs Please use Your Admin Login Credentials</p>
</div>)
};

export default Introduction;