import React from 'react';
import './Manage.css'
import API from '../utils/API';
import {Table, Container, Jumbotron} from 'react-bootstrap'
import EditAssessment from './EditAssessment';
import {trackPromise} from 'react-promise-tracker'
import {Redirect} from 'react-router-dom'
import Front from './Front';
// import Register from './LogReg/Register'
class Assessment extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errorMsg: '',
            redirectToReferrer:false
        }
        
    }

    componentDidMount() {
        console.log("Authorization:" , "Bearer "+sessionStorage.getItem('token') )
        trackPromise(
            
            API.get('/assessment/', {headers:{
                'Content-Type': 'application/json',
                Authorization: "Bearer "+sessionStorage.getItem('token') ,
              }})
            .then(response => {
                /* console.log(response) */
                this.setState({ posts: response.data.data })
            })
            .catch(error => {
                /* redirectToLogin(); */
                console.log(error.response.status);
                let errorStatus;
                if(error.response){
                    
                    errorStatus = error.response.status;
                    switch(errorStatus){
                        case 403:
                            console.log(error)
                            this.setState({errorMsg:"Access denied", redirectToReferrer:true});
                            break;
                        case 404:
                            break;
                        default:
                            break;
                    }
                }
                this.setState({ errorMsg: 'Error in recieving Data' });
            })
        )
    }
    

    render() {
        const { posts, errorMsg } = this.state
        return (
            <div>
                <Front />
                <Container>
                    <Jumbotron>
                    {this.state.redirectToReferrer && <Redirect to="/login"/>}
                    
                    <h2>Students Assessment</h2>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No.</th>
                                <th>Branch</th>
                                <th>Unit Test</th>
                                <th>Mid-Term Test</th>
                                <th>Final Test</th>
                                <th>Grade</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.length ?
                                posts.map(post =>
                                    <tr key={post.student.rollNo}>
                                        <td>{post.student.name}</td>
                                        <td>{post.student.rollNo}</td>
                                        <td>{post.student.branch}</td>
                                        <td>{post.assessment.unitTest}</td>
                                        <td>{post.assessment.midTermTest}</td>
                                        <td>{post.assessment.finalTest}</td>
                                        <td>{post.assessment.grade}</td>
                                        {<td><EditAssessment assessment={post}/></td>}
                                    </tr>
                                ) :
                                null
                            }
                            {
                                errorMsg ?
                                    posts.map(post =>
                                        <tr key='Error'>
                                            <td>{errorMsg}</td>
                                        </tr>
                                    ) :
                                    null

                            }
                        </tbody>
                    </Table>
                    </Jumbotron>
                </Container>
            </div>
        )
    }

}

export default Assessment;