import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal, Form, Col } from 'react-bootstrap';
import API from '../utils/API';


class StudentEditModal extends Component {
   
    state = {
        
        name:this.props.student.name,
        branch:this.props.student.branch,
        gender:this.props.student.gender,
        phone:this.props.student.phone,
        email:this.props.student.email,
        city:this.props.student.city,
        errorMsg:'',
        errors:{
            name:'',
            phone:'',
            email:'',
            city:''
        },
        validity:false
    }

    handleChange=(event)=>{
        event.persist();
        const {name,value}=event.target;
        this.setState({[name]:value},()=>{this.ValidationProc(name, value)})
       // console.log(this.state)
    }
    
ValidationProc=(name,value)=>{
    let errors = this.state.errors;
    let validity = false;

    const validEmailRegex = // eslint-disable-next-line 
                        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); 
    
    const validPhoneNumber = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/); 
    const validCityName = RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);                   

    switch (name) {
      case 'name':
        errors.name = value.length < 5 ? 'Username must be 5 characters long' :'';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value)?'':'Email Not Valid';
        break;
      case 'phone':
        errors.phone = validPhoneNumber.test(value) ?  '': "Invalid Phone number";
        break;
      case 'city':
        errors.city = validCityName.test(value) ? '' : "Select city Appropriately";
        break;
    
      default:
        break;
    }

    validity = errors.name === "" && errors.email === "" && errors.phone === "" && errors.city === ""?true:false
    console.log('validity check'+validity);
    this.setState({errors, validity, [name]: value }, () => {
      console.log(errors);
      
    })
}

    
    handleSubmit=(event)=>{
        console.log(this.state.validity)
        event.preventDefault();
        console.log('propseee',this.state)
        if(this.state.validity){
        API.put('/student_ru/student/update',{
        "studentId": this.props.student.studentId,
        "rollNo": this.props.student.rollNo,
        "name": this.state.name,
        "branch": this.state.branch,
        "gender": this.state.gender,
        "phone": this.state.phone,
        "email": this.state.email,
        "city": this.state.city
        },{headers:{
            'Content-Type': 'application/json',
            Authorization: "Bearer "+ sessionStorage.getItem('token')
        }}).then((res)=>{
            console.log(res)
        },error=>{
            this.setState({errorMsg:'Please check your details'})
            this.setState({flagger:false})
        })
      this.props.onHide()
      window.location.reload()
    }
    }
    handleEdit=()=>{
        this.setState({disabled:false})
        this.props.changeEdit() 
    }

    render(){
        const styles={color:'red'}
        let err=''
        if(this.state.errorMsg){
            err=this.state.errorMsg;
        }
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            Student Update
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>{err}</Form.Label>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Name</Form.Label>
                    <Form.Control disabled={this.props.disabled} name="name" type="text" onChange={this.handleChange} defaultValue={this.props.student.name} placeholder="Enter username" />
                    <span style={styles}>{this.state.errors.name}</span>
                </Form.Group>
               
                <Form.Group controlId="formBasicRollno">
                    <Form.Label>RollNo</Form.Label>
                    <Form.Control disabled={true} name="rollno" defaultValue={this.props.student.rollNo}  />
                </Form.Group>

                <Form.Group controlId="formBasicBranch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control disabled={this.props.disabled}  as="select"  name="branch" onChange={this.handleChange} defaultValue={this.props.student.branch} placeholder="Select Branch" >
                        <option value="CE">Civil Engineering</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="CS">Computer Science Engineering</option>
                        <option value="IT">Information Technology</option>
                        <option value="EC">Electronics & Comm Engineering</option>
                    </Form.Control>
                </Form.Group> 
                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control disabled={this.props.disabled}  as="select"  name="gender"onChange={this.handleChange} defaultValue={this.props.student.gender} placeholder="Gender" >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Others</option>
                    </Form.Control>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control disabled={this.props.disabled}  type="text"  name="phone" onChange={this.handleChange} defaultValue={this.props.student.phone} placeholder="Phone" />
                        <span style={styles}>{this.state.errors.phone}</span>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled={this.props.disabled}  type="email"  name="email" onChange={this.handleChange} defaultValue={this.props.student.email} placeholder="Enter Email" />
                        <span style={styles}>{this.state.errors.email}</span>
                    </Form.Group>                    
                </Form.Row>
                <Form.Group controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control  disabled={this.props.disabled} type="text"  name="city"onChange={this.handleChange}  defaultValue={this.props.student.city} placeholder="Select City" />
                    <span style={styles}>{this.state.errors.city}</span>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        {this.props.edit && <Button variant="primary" onClick={this.handleEdit} >Edit</Button>}     
        {!this.props.edit && <Button  variant="primary" type="submit" onClick={this.handleSubmit}> Submit </Button>}
        </Modal.Footer>
      </Modal>
    );
  }
}
  
class EditStudent extends Component{   
    state = {modalShow:false,edit:true,disabled:true}
   
    handleRendering=()=>{
        this.setState({modalShow:true})
        this.setState({renderer:true}) 
    }
    render(){
        return ( 
            <ButtonToolbar>
                <Button variant="primary" onClick={this.handleRendering}>
                    Details
                </Button>

                {this.state.renderer && <StudentEditModal
                    student = {this.props.student}
                    show={this.state.modalShow}
                    onHide={()=>this.setState({modalShow:false,renderer:false,edit:true,disabled:true})}
                    changeEdit={()=>this.setState({edit:!(this.state.edit),disabled:false})}
                    edit={this.state.edit }
                    disabled={this.state.disabled}
                />}
            </ButtonToolbar>
         );
        }
    
}
 
export default EditStudent;

