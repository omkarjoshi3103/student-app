import React, { Component } from 'react';
class HomePage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>This is Home Page\n Hi {this.props.user}</div>
        );
    }
}
 
export default HomePage;