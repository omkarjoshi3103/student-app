import React from 'react';
import {Redirect} from 'react-router-dom'

const redirectToLogin=()=>{
    return <Redirect to="/login"/>
}

export default redirectToLogin;