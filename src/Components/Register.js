import React, { Component } from 'react';
import API from '../utils/API'
import { Button, Modal, Form, Col,  Container, Jumbotron } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
// import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';

/////
// function 
/////

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rollNo: "",
      name: "",
      branch: "",
      gender: "",
      phone: "",
      email: "",
      city: "",
      errors: {
        rollNo: " ",
        name: " ",
        branch: " ",
        gender: " ",
        phone: " ",
        email: " ",
        city: " ",
      },
      validity: false,
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) })
  }

  validateField(name, value) {
    let errors = this.state.errors;
    let validity = false;

    const validEmailRegex = // eslint-disable-next-line 
                        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); 
        

    switch (name) {
      case 'name':
        /* errors.email = validEmailRegex.test(value)?'':'Email Not Valid'; */
        errors.username = value.length < 4 ? 'Username must be 5 characters long' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value)?'':'Email Not Valid';
        break;
      case 'gender':
        errors.gender = value === 0 ? "Select Gender Appropriately" : " ";
        break;
      case 'branch':
        errors.branch = value === 0 ? "Select Branch Appropriately" : " ";
        break;
      default:
        break;
    }
/*rollNo: " ", name: " ", branch: " ", gender: " ", phone: " ", email: "", city: " " */
    validity = errors.name === " " && errors.gender === " " && errors.branch === " " && errors.email === ""
    this.setState({ errors, validity, [name]: value }, () => {
      console.log(errors);
      console.log(validity);
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.validity) {
      API.post('student_cd/', {
        rollNo: this.state.rollNo,
        name: this.state.name,
        branch: this.state.branch,
        gender: this.state.gender,
        phone: this.state.phone,
        email: this.state.email,
        city: this.state.city
      }).then((response)=>{
        alert("Student Added Successfully");
        this.setState({ redirectToReferrer: true });
      },
      (error)=>{
        console.log(error);
        
        if(error.response){
          let errorStatus = error.response.status;
          let errorMsg = error.response.message;
          switch(errorStatus){
            case 409: alert(errorMsg);
                      break;
            default: break;
          }
        }else{
          console.log(error.message)
        }
        
      });
    }else{
      alert("Invalid Form");
      console.log("invalid form")
  }
  }

  render() {

    const redirectToReferrer = this.state.redirectToReferrer;
    if(redirectToReferrer){
            alert("Student Added Succesfully");
      return <Redirect to="/manage"/>
  }
    return (
      <div>
        <Container>
                    <Jumbotron>
        <h2>Student Register</h2>
        <Form>
          <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={this.handleChange} name="name" type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Roll Number</Form.Label>
            <Form.Control onChange={this.handleChange} name="rollNo" type="text" placeholder="Enter username" />
          </Form.Group>
          <p>here</p>
          <Form.Group >
            <Form.Label>Branch</Form.Label>
            <Form.Control as="select" onChange={this.handleChange} name="branch"  >
              <option value="0">Select</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
              <option value="EC">EC</option>
              <option value="CE">CE</option>
              <option value="ME">ME</option>
            </Form.Control>
          </Form.Group>
          <Form.Group >
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" onChange={this.handleChange} name="gender" placeholder="Gender" >
              <option value="0">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" onChange={this.handleChange} name="phone" placeholder="Phone" />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={this.handleChange} name="email" placeholder="Enter Email" />
            </Form.Group>
          </Form.Row>
          <Form.Group >
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" onChange={this.handleChange} placeholder="Select City" />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}> Submit </Button>
          </Modal.Footer>
        </Form>
        </Jumbotron>
        </Container>
      </div>
    );
  }

}

export default Register;
