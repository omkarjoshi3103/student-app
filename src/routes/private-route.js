import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component:Component, exact, strict, path,...rest}) => (
    
    <Route {...rest} render={(props)=>(
        
        localStorage.getItem('token')
            ?<Component {...props} {...rest}/>
            :<Redirect to='/login'/>
    )} />
)

export default PrivateRoute;


