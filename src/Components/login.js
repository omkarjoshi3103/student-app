import React, { Component } from 'react';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import API from '../utils/API'
import {trackPromise} from 'react-promise-tracker'
import Front from './Front';
class Login extends Component {

    state={
        username:null,
            password:null,
            errors:{
                username:null,
                password:null,
            } 
        }
    

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            errorMsg:"",
            errors:{
                username:" ",
                password:" "
            },
            validity:false,
            submitted:false,
            redirectToReferrer: false,
            authorization: null
        }
    }

    async componentDidMount(){

    }

    handleValidation=(event)=>{
        const {name,value} = event.target;
        this.setState({[name]:value},
            ()=>{this.validateField(name, value)})
        /* console.log(this.state) */
    }

    validateField(name, value){
        let errors=this.state.errors;
        let validity = false;
        /* const validEmailRegex = // eslint-disable-next-line 
                        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i); */
        switch(name){
            case 'username':
                /* errors.email = validEmailRegex.test(value)?'':'Email Not Valid'; */
                errors.username = value.length < 4 ? 'Username must be 5 characters long': '';
                break;
            case 'password':
                errors.password = value.length < 4 ? 'Password must be 8 characters long!': '';
                
                break;
            default:
                break;
        }
        validity = errors.username === "" && errors.password === ""
        this.setState({errors, validity, [name]: value}, ()=> {
            /* console.log(errors) */
        })
    }


    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.state.validity){
            this.setState({submitted:true});
            /* this.props.changeLoginState(); */
            /* this.login(); */
            trackPromise(
                    API.post("/user/login", {
                    "username": this.state.username,
                    "password": this.state.password
                }).then((response) => {
                  /*   console.log('login response:',response); */
                    let authorization = response.data.authorization;
                    
                    let success = response.data.success
                    if(success==="true"){
                        /* localStorage.setItem('token',authorization) */
                        sessionStorage.setItem('token',authorization)
                        this.setState({authorization})
                        /* this.props.changeUsername(this.state.username); */
                        console.log('submitted')
                        /* this.props.changeUsername(this.state.username); */
                        this.setState({ redirectToReferrer: true })
                    }else{
                        this.setState({errorMsg:response.data.message});
                    }
                    
                }, (error) => {
                    console.log(error.message);
                    let errorStatus;
                    if(error.response){
                        errorStatus = error.response.status;
                        switch(errorStatus){
                            case 404:
                                this.setState({errorMsg:"User does not exist"});
                                break;
                            default:
                                break;
                        }
                    }
                    else{
                        this.setState({errorMsg:error.message})
                    }
                    
                })
            );
            console.log("form  submitted")
        }else{
            console.log("invalid form")
        }
    }

    render() { 
        const styles={color:'red'}
        const redirectToReferrer = this.state.redirectToReferrer;
        if(redirectToReferrer){
            return <Redirect to="manage"/>
        }
        return (
            <div>
                <Front />
                <Container>
                    <Jumbotron>
                        <p style={styles}>{this.state.errorMsg}</p>
                        <Form>
                        <Form.Group controlId="formBasicusername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={this.handleValidation} name="username" type="username" placeholder="Enter username" />
                            <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                            </Form.Text>
                            <span style={styles}>{this.state.errors.username}</span>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={this.handleValidation} name="password" placeholder="Password" />
                            <span style={styles}>{this.state.errors.password}</span>
                        </Form.Group>
                        
                        <Button onClick={this.handleSubmit} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    </Jumbotron>
                </Container>
            </div>
            
        );
    }
}

export default Login;