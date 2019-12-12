import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import Front from './Front';


class NotFound extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Front/>
                <Card.Header></Card.Header>
                <Card className="text-center">
                <Card.Body><h1>Page Not Found</h1></Card.Body>
                </Card>
            </React.Fragment>
         );
    }
}
 
export default NotFound;