import React, { Component} from 'react';
import { ButtonToolbar, Button, Modal, Form} from 'react-bootstrap';
import API from '../utils/API'


  class EditModal extends Component {
    state = { 
        unitTest:'',
        midTermTest:'',
        finalTest:'',
        errors: {
            unitTest:'',
            midTermTest:'',
            finalTest:''
        },
        validity:false
    }

    handleChange=(event)=>{
        event.persist();
        const {name,value} = event.target;
        this.setState({[name]:value},
            ()=>{this.validateField(name, value)})
        /* console.log(this.state) */
    }

    validateField=(name, value)=>{
        
        let errors= this.state.errors;
        const marksRegex = RegExp(/^(?:[1-9]|0[1-9]|10)$/)
        let validity = false;
        /* const validEmailRegex = // eslint-disable-next-line 
                        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); */
        switch(name){
            case 'unitTest':
                errors.unitTest = marksRegex.test(value)?"":'Marks should be between 0 to 10';
                break;
            case 'midTermTest':
                errors.midTermTest = marksRegex.test(value)?"":'Marks should be between 0 to 10';
                break;
            case 'finalTest':          /* errors.email = validEmailRegex.test(value)?'':'Email Not Valid'; */
                errors.finalTest = marksRegex.test(value)?"":'Marks should be between 0 to 10';
                break;
            default:
                break;
        }
        console.log(errors.unitTest === "" && errors.midTermTest === "" && errors.finalTest === "")
        validity = errors.unitTest === "" && errors.midTermTest === "" && errors.finalTest === "" ? true:false
        console.log('validity ',validity)
        this.setState({errors, validity, [name]: value}, ()=> {
            console.log(errors)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('validity', this.state.validity)
        if(this.state.validity){    
            API.put('/assessment/assessment_id/'+ this.props.student_assessment.assessment.assessmentId,{
                "assessmentId": this.props.student_assessment.assessment.assessmentId,
                "studentId": this.props.student_assessment.student.studentId,
                "unitTest": this.state.unitTest,
                "midTermTest": this.state.midTermTest,
                "finalTest": this.state.finalTest,
            }).then((resp)=>{
                console.log(resp)
            })
            this.props.onHide()
            window.location.reload()
            
        }else{
            console.log('invalid form')
        }

    }
      render() { 
        const styles = {color:'red'}
          return ( 
            <Modal
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            
            
            <Modal.Footer>
            <Button  variant="primary" type="submit" onClick={this.handleSubmit}> Submit </Button>
            </Modal.Footer>
          </Modal>
        );
      }
  }
   
 

class ViewAssessment extends Component {
    state = { modalShow:false }
    
    render() { 
        return ( 
            <div>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({modalShow:true})}>
                        Assessment
                    </Button>

                    <EditModal
                        student_assessment = {this.props.assessment}
                        show={this.state.modalShow}
                        onHide={() => this.setState({modalShow:false})}
                    />
                </ButtonToolbar>
            </div>
         );
    }
}
 

export default ViewAssessment;