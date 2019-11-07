import React, { Component } from 'react';
import { Card } from 'react-bootstrap';


class NotFound extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Card.Header></Card.Header>
                <Card className="text-center">
                <Card.Body><h1>Page Not Found</h1></Card.Body>
                </Card>
            </React.Fragment>
         );
    }
}
 
export default NotFound;