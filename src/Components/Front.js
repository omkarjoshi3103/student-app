import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import {  Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
// import 'bootstrap/dist/css/bootstrap-theme.css';
/* import Home from './Home';
import Manage from './Manage'; 
import Assessment from './Assessment'; */

class Front extends React.Component {
    state={
        navLink:null
    }
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
    componentDidMount(){
        if (sessionStorage.getItem('token')!=null) {
            this.setState({navLink : <Nav.Link href = '/logout'>Logout</Nav.Link>})
        } else{
            this.setState({navLink : <Nav.Link href = '/login'>Login</Nav.Link>})
        }                 
    }
    render() {
        let navLink;
        let log_in_out;
        if (sessionStorage.getItem('token')!=null) {
            log_in_out = <Nav.Link href = '/logout' className="text-white">Logout</Nav.Link>
            navLink = 
            [
                <Nav.Link href = '/assessment'>Assessment</Nav.Link>,
                <Nav.Link href = '/manage'>Manage</Nav.Link>,
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
                        {log_in_out}

                    <Nav>

                    </Nav>

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
        
        </React.Fragment>
        )
    }
}

export default Front;
