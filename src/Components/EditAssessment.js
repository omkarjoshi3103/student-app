import React, { Component, useState } from 'react';
import { ButtonToolbar, Button, Modal, Form} from 'react-bootstrap';
import API from '../utils/API'

function MyVerticallyCenteredModal(props) {

    const [state, setState] = useState({
        unitTest:props.student_assessment.assessment.unitTest,
        midTermTest:props.student_assessment.assessment.midTermTest,
        finalTest:props.student_assessment.assessment.finalTest,
    })

    const [errors, setErrors] = useState({
        unitTest:' ',
        midTermTest:' ',
        finalTest:' '
    })
    const [validity, setValidity] = useState(false)


    const handleChange=(event)=>{
        event.persist();
        const {name,value} = event.target;
        setState(state => ({ ...state, [event.target.name]: event.target.value }),
            ()=>{validateField(name, value)})
        /* console.log(this.state) */
    }

    const validateField=(name, value)=>{
        let error= errors;
        const marksRegex = RegExp(/^(?:[1-9]|0[1-9]|10)$/)
        /* const validEmailRegex = // eslint-disable-next-line 
                        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); */
        switch(name){
            case 'unitTest':
            case 'midTermTest':
            case 'finalTest':          /* errors.email = validEmailRegex.test(value)?'':'Email Not Valid'; */
                error.unitTest = marksRegex.test(value)?'':'Marks should be between 0 to 10';
                break;
            default:
                break;
        }
        error.username === "" && error.password === ""? setValidity(true):setValidity(false)
        setErrors({error, validity, [name]: value}, ()=> {
            console.log(error)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state)
        API.put('/assessment/assessment_id/'+ props.student_assessment.assessment.assessmentId,{
            "assessmentId": props.student_assessment.assessment.assessmentId,
            "studentId": props.student_assessment.student.studentId,
            "unitTest": state.unitTest,
            "midTermTest": state.midTermTest,
            "finalTest": state.finalTest,
         })
         props.onHide()
         window.location.reload()

    }
   
    

    

    const styles={color:'red'}
    
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
                <p style={styles}>{errors.unitTest}</p>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Unit Test</Form.Label>
                    <Form.Control type="text"   name="unitTest" onChange={handleChange} defaultValue={props.student_assessment.assessment.unitTest} placeholder="Enter Marks" />
                </Form.Group> 
                <p style={styles}>{errors.midTermTest}</p>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mid-Term Test</Form.Label>
                    <Form.Control type="text"  name="midTermTest" onChange={handleChange} defaultValue={props.student_assessment.assessment.midTermTest} placeholder="Enter Marks" />
                </Form.Group>
                <p style={styles}>{errors.finalTest}</p>
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