import React, {useEffect, Fragment} from 'react';
import { checkAuthenticated } from "../utility/auth";
import {useAuthStore} from "../utility/reducers/auth";
import {Redirect} from 'react-router-dom'


const Layout = ({children}) =>{
    const [authState, dispatch] = useAuthStore()

    useEffect(()=>{
        if(authState.isAuthenticated){
            console.log('you are logged in.')
        }else{
            checkAuthenticated(dispatch)
        }
        
    },[])

    return(
        
        <Fragment>
                {children}
        </Fragment>
    )
}


export default Layout;
