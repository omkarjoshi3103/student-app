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
        validity:true,
        assessment:this.props.student_assessment.assessment
    }

    componentDidMount(){
        API.get('/assessment/'+this.props.student.studentId, 
        {headers:{
            'Content-Type': 'application/json',
            Authorization: "Bearer "+sessionStorage.getItem('token')
        }})
            .then(response => {
                console.log('response',response)
                this.setState({ assessment: response.data.data.assessment })
                console.log('assessment',this.state.assessment)
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMsg: 'Error in recieving Data' });
            })
    }

    handleChange=(event)=>{
        event.persist();
        const {name,value} = event.target;
        this.setState({[name]:value},
            ()=>{this.validateField(name, value)})
    }

    validateField=(name, value)=>{
        
        let errors= this.state.errors;
        const marksRegex = RegExp(/^(?:[1-9]|0[1-9]|10)$/)
        let validity = false;
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
        validity = errors.unitTest === "" && errors.midTermTest === "" && errors.finalTest === "" ? true:false
        this.setState({errors, validity, [name]: value}, ()=> {
            console.log(errors)
        })
    }

    

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.validity){    
            API.put('/assessment/assessment_id/'+ this.props.student_assessment.assessment.assessmentId,{
                "assessmentId": this.props.student_assessment.assessment.assessmentId,
                "studentId": this.props.student_assessment.student.studentId,
                "unitTest": this.state.unitTest,
                "midTermTest": this.state.midTermTest,
                "finalTest": this.state.finalTest},
                {headers:{
                    'Content-Type': 'application/json',
                    Authorization: "Bearer "+ sessionStorage.getItem('token')
                }}).then((resp)=>{
                console.log(resp)
            })
            this.props.onHide()
            /* window.location.reload() */
            
        }else{
            console.log('invalid form')
        }
    }

    

    handleEdit=()=>{
        this.setState({disabled:false})
        this.props.changeEdit()
    }
    
      render() { 
        const styles = {color:'red'}
          return ( 
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.props.student_assessment.student.name}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>   
                    <Form.Group controlId="formBasicUnitTest">
                        <Form.Label>Unit Test</Form.Label>
                        <Form.Control disabled={this.props.disabled} type="text"   name="unitTest" onChange={this.handleChange} defaultValue={this.state.assessment.unitTest} placeholder="Enter Marks" />
                        <span style={styles}>{this.state.errors.unitTest}</span>
                    </Form.Group> 
                    
                    <Form.Group controlId="formBasicMidTermTest">
                        <Form.Label>Mid-Term Test</Form.Label>
                        <Form.Control disabled={this.props.disabled} type="text"  name="midTermTest" onChange={this.handleChange} defaultValue={this.state.assessment.midTermTest} placeholder="Enter Marks" />
                        <span style={styles}>{this.state.errors.midTermTest}</span>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicFinalTest">
                        <Form.Label>Final Test</Form.Label>
                        <Form.Control disabled={this.props.disabled} type="text"  name="finalTest" onChange={this.handleChange} defaultValue={this.state.assessment.finalTest} placeholder="Enter Marks" />
                        <span style={styles}>{this.state.errors.finalTest}</span>
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control disabled type="text"  name="grade"  defaultValue={this.state.assessment.grade} />
                        <span style={styles}>{this.state.errors.grade}</span>
                    </Form.Group>
                </Form>
            </Modal.Body>
                
            
            <Modal.Footer>
            {!this.props.edit &&
            <Button  variant="primary" onClick={this.handleEdit}> Edit </Button>}
            {this.props.edit &&
            <Button  variant="primary" type="submit" onClick={this.handleSubmit}> Submit </Button>}
            
            </Modal.Footer>
          </Modal>
        );
      }
  }
   
  class AddModal extends Component {
    state = { 
        unitTest:'',
        midTermTest:'',
        finalTest:'',
        errors: {
            unitTest:" ",
            midTermTest:" ",
            finalTest:" "
        },
        validity:false,
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
        console.log({
            "studentId": this.props.student.studentId.studentId,
            "unitTest": this.state.unitTest,
            "midTermTest": this.state.midTermTest,
            "finalTest": this.state.finalTest});
        if(this.state.validity){    
            API.post('/assessment',{
                "studentId": this.props.student.studentId, //edit krna h studentid ko
                "unitTest": this.state.unitTest,
                "midTermTest": this.state.midTermTest,
                "finalTest": this.state.finalTest},
                {headers:{
                    'Content-Type': 'application/json',
                    Authorization: "Bearer "+ sessionStorage.getItem('token')
                }}).then((resp)=>{
                console.log(resp)
            })
            this.props.onHide()
            //window.location.reload();
            
        }else{
            console.log('invalid form')
        }
    }

    handleEdit=()=>{
        this.setState({disabled:false})
        this.props.changeEdit()
    }
    
      render() { 
        const styles = {color:'red'}
          return ( 
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.props.student.name}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicUnitTest">
                        <Form.Label>Unit Test</Form.Label>
                        <Form.Control  type="text"   name="unitTest" onChange={this.handleChange}  placeholder="Enter Marks" />
                        <span style={styles}>{this.state.errors.unitTest}</span>
                    </Form.Group> 
                    
                    <Form.Group controlId="formBasicMidTermTest">
                        <Form.Label>Mid-Term Test</Form.Label>
                        <Form.Control  type="text"  name="midTermTest" onChange={this.handleChange}  placeholder="Enter Marks" />
                        <span style={styles}>{this.state.errors.midTermTest}</span>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicFinalTest">
                        <Form.Label>Final Test</Form.Label>
                        <Form.Control  type="text"  name="finalTest" onChange={this.handleChange}  placeholder="Enter Marks" />
                        <span style={styles}>{this.state.errors.finalTest}</span>
                    </Form.Group>
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
                
                <Button  variant="primary" type="submit" onClick={this.handleSubmit}> Submit </Button>
            
            </Modal.Footer>
          </Modal>
        );
      }
  }
   
class ViewAssessment extends Component {
    state = { modalShow:false, edit:false, disabled: true, assessment:null}
    
    changeEdit=()=>{
        this.setState({edit: !(this.state.edit), disabled: false})
        console.log(this.state.disabled)
    }

    fetchAssessment=()=>{
        API.get('/assessment/'+this.props.student.studentId,
        {headers:{
            'Content-Type': 'application/json',
            Authorization: "Bearer "+sessionStorage.getItem('token')
        }})
        .then(response => {
            /* console.log(response) */
            this.setState({ assessment: response.data.data })
            this.setState({renderer:true})
        })
        .catch(error => {
            console.log(error);
            this.setState({null_renderer:true})
            this.setState({ errorMsg: 'Error in recieving Data' });
        })
    }

    handleViewAssessment=()=>{
        this.setState({modalShow:true})
        this.fetchAssessment()
        console.log()
    }

    render(){ 
        
        return ( 
            <div>
                <ButtonToolbar>
                    <Button variant="secondary" onClick={this.handleViewAssessment}>
                        Assessment
                    </Button>
                    {this.state.renderer && 
                        <EditModal
                            student_assessment = {this.state.assessment}
                            show={this.state.modalShow}
                            onHide={()=>this.setState({modalShow:false, edit:false, disabled:true, renderer:false})}
                            changeEdit={this.changeEdit}
                            edit={this.state.edit}
                            disabled={this.state.disabled}
                            student={this.props.student}
                        />}
                    {this.state.null_renderer && 
                        <AddModal
                            student_assessment = {this.state.assessment}
                            show={this.state.modalShow}
                            onHide={()=>this.setState({modalShow:false, edit:false, disabled:true, null_renderer:false})}
                            changeEdit={this.changeEdit}
                            edit={this.state.edit}
                            disabled={this.state.disabled}
                            student={this.props.student}
                        />}
                </ButtonToolbar>
            </div>
         );
    }
}

export default ViewAssessment;