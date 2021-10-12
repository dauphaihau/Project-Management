import React from 'react'
import {Redirect} from "react-router-dom";

export default function Dashboard(props) {
    
    if (!localStorage.getItem('accessToken')) {
      alert('please login to your account')
        return <Redirect to='/login'/>
    }

    return (
        <div>
            Dashboard
        </div>
    )
}
