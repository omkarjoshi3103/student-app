import React, { Component, useState } from 'react';
import { ButtonToolbar, Button, Modal, Form, Col } from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {

    const [state, setState] = useState({
        name:props.student_assessment.student.name,
        rollNo:props.student_assessment.student.rollNo,
        unitTest:props.student_assessment.assessment.unitTest,
        midTermTest:props.student_assessment.assessment.midTermTest,
        finalTest:props.student_assessment.assessment.finalTest,
        grade:props.student_assessment.assessment.grade
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state)
        /* API. */

    }
   
    

    const handleChange = (event) => {
        event.persist();
        setState(state => ({ ...state, [event.target.name]: event.target.value }));
        console.log(event.target.value)
      };

      
    
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
                        <Form.Control name="name" type="text" onChange={handleChange} defaultValue={props.student_assessment.student.name} placeholder="Enter username" />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Unit Test</Form.Label>
                    <Form.Control type="text"   name="unitTest" onChange={handleChange} defaultValue={props.student_assessment.assessment.unitTest} placeholder="Select Branch" />
                </Form.Group> 
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mid-Term Test</Form.Label>
                    <Form.Control type="text"  name="midTermTest" onChange={handleChange} defaultValue={props.student_assessment.assessment.midTermTest} placeholder="Enter Marks" />
                        
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Final Test</Form.Label>
                    <Form.Control type="text"  name="finalTest" onChange={handleChange} defaultValue={props.student_assessment.assessment.finalTest} placeholder="Enter Marks" />
                </Form.Group>
              
            </Form>
        </Modal.Body>
        
        
        <Modal.Footer>
        <Button  variant="primary" type="submit" onClick={handleSubmit}> Submit </Button>
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