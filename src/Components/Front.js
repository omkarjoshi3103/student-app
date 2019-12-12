import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import {  Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Front extends React.Component {
    state={
        navLink:null
    }
    
    
    render() {
        let navLink;
        let log_in_out;
        if (sessionStorage.getItem('token')!=null) {
            log_in_out = <Nav.Link href = '/logout' className="text-white">Logout</Nav.Link>
            navLink = 
            [
                <Nav.Link key={1} href = '/assessment'>Assessment</Nav.Link>,
                <Nav.Link key={2} href = '/manage'>Manage</Nav.Link>,
            ]
        } else{
            log_in_out = <Nav.Link href = '/login' className="text-white">Login</Nav.Link>
        } 
        return (
        <React.Fragment>
            
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Student Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navLink}    
                    </Nav>
                        
                    <Nav>
                        {log_in_out}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

            
        
        </React.Fragment>
        )
    }
}

export default Front;
