import React from 'react';


const Logout =()=>{

    const handleLogout =()=> {
        console.log('loggin out')

    }
    return(<div>
        <button onClick={handleLogout}>logout</button>
    </div>)
}

export default Logout;