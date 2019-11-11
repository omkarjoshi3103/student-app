import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal, Form, Col } from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
    const handleEdit = (event) => {
        event.preventDefault();
        console.log(event.target.name)
    }
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Student Assessment Update
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicusername">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="username" type="text" defaultValue={props.student_assessment.student.name} placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicusername">
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control name="rollNo" type="text" defaultValue={props.student_assessment.student.rollNo} placeholder="Enter username" />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Unit Test</Form.Label>
                    <Form.Control type="text"  name="unitTest" defaultValue={props.student_assessment.assessment.unitTest} placeholder="Select Branch" />
                </Form.Group> 
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mid-Term Test</Form.Label>
                    <Form.Control type="text"  name="midTermTest" defaultValue={props.student_assessment.assessment.midTermTest} placeholder="Gender" />
                        
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Final Test</Form.Label>
                    <Form.Control type="text"  name="finalTest" defaultValue={props.student_assessment.assessment.finalTest} placeholder="Phone" />
                </Form.Group>
                <Form.Group  controlId="formBasicPassword">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control as="select"  name="grade" defaultValue={props.student_assessment.assessment.grade} placeholder="Enter Email" >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="Fail">Fail</option>
                    </Form.Control>
                </Form.Group>   
            </Form>
        </Modal.Body>
        
        
        <Modal.Footer>
        <Button  variant="primary" type="submit" onClick={handleEdit}> Submit </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

class EditAssessment extends Component {
    state = { modalShow:false }
    
    render() { 
        return ( 
            <div>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({modalShow:true})}>
                        Edit
                    </Button>

                    <MyVerticallyCenteredModal
                        student_assessment = {this.props.assessment}
                        show={this.state.modalShow}
                        onHide={() => this.setState({modalShow:false})}
                    />
                </ButtonToolbar>
            </div>
         );
    }
}
 

export default EditAssessment;