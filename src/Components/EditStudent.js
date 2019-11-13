import React from 'react';
import { ButtonToolbar, Button, Modal, Form, Col } from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
    console.log(props.student)
    
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Student Update
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="username" type="text" defaultValue={props.student.name} placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formBasicRollNo">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control name="rollNo" type="text" defaultValue={props.student.rollNo} placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicBranch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control type="text"  name="branch" defaultValue={props.student.branch} placeholder="Select Branch" />
                </Form.Group> 
                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select"  name="gender" defaultValue={props.student.gender} placeholder="Gender" >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Others</option>
                    </Form.Control>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text"  name="phone" defaultValue={props.student.phone} placeholder="Phone" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  name="email" defaultValue={props.student.email} placeholder="Enter Email" />
                    </Form.Group>                    
                </Form.Row>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text"  name="city" defaultValue={props.student.city} placeholder="Select City" />
                </Form.Group>
                
                
                {/* Object.keys(props.student).map((keyName, i)=>(
                    <Form.Group>
                        <Form.Label>{keyName}</Form.Label>
                        <Form.Control name={keyName} type="text"  />
                    </Form.Group>
                )) */}

                
                
            </Form>
        </Modal.Body>
        
        
        <Modal.Footer>
        <Button  variant="primary" type="submit"> Submit </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
function EditStudent (props){   
    const [modalShow, setModalShow] = React.useState(false);
        console.log(props.student)
        
        /* Object.keys(props.student).map((keyName, i)=>(
            
        )) */
        return ( 
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit
                </Button>

                <MyVerticallyCenteredModal
                    student = {props.student}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </ButtonToolbar>
         );
    
}
 
export default EditStudent;