import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import {  Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// import 'bootstrap/dist/css/bootstrap-theme.css';
/* import Home from './Home';
import Manage from './Manage'; 
import Assessment from './Assessment'; */

class Front extends React.Component {

    //////
    /* constructor(props) {
        super(props);
        this.openPage = this.openPage.bind(this);
    } */
    /* openPage(pageName, evt) {
        console.log(pageName);
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        console.log(document.getElementById(pageName))
        document.getElementById(pageName).style.display = "block";
        evt.currentTarget.className += " active";
    } */
    /////   
    isLoggedIn(){}
    render() {
        let navLink ;
        if (!window.location.pathname === '/login') {
            navLink = <Nav.Link href = '/logout'>Logout</Nav.Link>
          } else {
            navLink = <Nav.Link href = '/login'>Login</Nav.Link>
          }
        return <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Student Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link  onClick = {(evt) => this.openPage('Home',evt)}>Home</Nav.Link>
                        <Nav.Link  onClick = {(evt) => this.openPage('Manage',evt)}>Manage</Nav.Link>
                        <Nav.Link  onClick = {(evt) => this.openPage('Assessment',evt)}>Assessment</Nav.Link> */}
                        <Nav.Link href = '/assessment'>Assessment</Nav.Link>
                        <Nav.Link href = '/manage'>Manage</Nav.Link>
                        
                        {navLink}

                        
                        
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                </Navbar.Collapse>
            </Navbar>

             {/* <div id="Home" className="tabcontent">
                    <Home />
                </div>

                <div id="Manage" className="tabcontent">
                    <Manage />
                </div>
                <div id="Assessment" className="tabcontent">
                    <Assessment />
                </div> */}
        </div>
    }
}

export default Front;
