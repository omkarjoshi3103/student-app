import React from 'react'
import {Route, Redirect} from 'react-router-dom'
/* import API from "../utils/API" */
const PrivateRoute = ({component:Component, exact, strict, path,...rest}) => (
    
    <Route {...rest} render={(props)=>(
        
        sessionStorage.getItem('token')
            ?<Component {...props} {...rest}/>
            :<Redirect to='/login'/>
    )} />
)

/* const authorize=()=>{
    API.
} */

export default PrivateRoute;


