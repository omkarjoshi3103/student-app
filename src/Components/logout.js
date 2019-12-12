import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
class Logout extends Component {
    state = {  }


    render() { 
        sessionStorage.removeItem('token')
        console.log(' logout',this.props)
        return ( 
            <Redirect to="/login" />
         );
    }
}

export default Logout;

