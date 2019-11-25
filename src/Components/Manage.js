import React from 'react';
import './Manage.css'
import { Table, Button, Container, Jumbotron} from 'react-bootstrap';
import EditStudent from './EditStudent';
import API from '../utils/API';
import Delete from './Delete';
import ViewAssessment from './ViewAssessment';
/* import Register from './Register' */
class Manage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
        API.get('student_find/getstudents/',{headers:{
                                                        "Authorization": "Bearer "+sessionStorage.getItem('token') 
                                                      }})
            .then(response => {
                /* console.log(response.data) */
                this.setState({ posts: response.data })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMsg: 'Error in recieving Data' });
            })
            
    }






render() {
    const { posts, errorMsg } = this.state
    return (
        <Container>
            <Jumbotron>
                {this.state.errorMsg}
                <h2>List of Students</h2>
                <Button className='top-right' href="/register">Add New Student</Button>
                <Table hover striped bordered>
                    <thead>
                        <tr>
                            <th>RollNo</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Assessment</th>
                            <th>Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.length ?
                                posts.map(post =>
                                    <tr key={post.studentId}>
                                        <td align="center">{post.rollNo}</td>
                                        <td>{post.name}</td>
                                        <td>{post.branch}</td>
                                        {<td><ViewAssessment student={post} /></td>}
                                        {/* <td><Button href="/viewAssessment">Assessment</Button></td> */}
                                        <td><EditStudent student={post} /></td>
                                        <td><Delete student = {post} /></td>
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
    )
}
}

export default Manage;