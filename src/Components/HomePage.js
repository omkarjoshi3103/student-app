import React, { Component } from 'react';
import Front from './Front';
class HomePage extends Component {
    state = {  }
    
    componentWillMount(){
        
    }
    render() { 
        
        
        return ( 
            <div>
                <Front/>
            
                <div>This is Home Page. 
                    <p>Hi {localStorage.getItem('token')}</p>
                </div>
            </div>
        );
    }
}
 
export default HomePage;