import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal, Form } from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
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
                <Form.Group controlId="formBasicusername">
                    <Form.Label>username address</Form.Label>
                    <Form.Control name="username" type="username" placeholder="Enter username" />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  name="password" placeholder="Password" />
                </Form.Group>
                
                <Button  variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        
        
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
function EditStudent (props){   
    const [modalShow, setModalShow] = React.useState(false);

        console.log(props)
        return ( 
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit
                </Button>

                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </ButtonToolbar>
         );
    
}
 
export default EditStudent;