import React, { Component } from 'react';
class HomePage extends Component {
    state = {  }
    componentWillMount(){
        
    }
    render() { 
        
        
        return ( 
            <div>This is Home Page. 
                <p>Hi {localStorage.getItem('token')}</p>
            </div>
        );
    }
}
 
export default HomePage;