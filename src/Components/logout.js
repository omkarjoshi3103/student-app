import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
class Logout extends Component {
    state = {  }


    render() { 
        localStorage.removeItem('token')
        /* this.props.changeLoginState(); */
        console.log(' logout',this.props)
        return ( 
            <Redirect to="/login" />
         );
    }
}

export default Logout;

