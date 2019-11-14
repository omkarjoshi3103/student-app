import React from 'react';
import './Manage.css'
import { Table, Button, Container, Jumbotron } from 'react-bootstrap';
import EditStudent from './EditStudent';
import API from '../utils/API';
import { trackPromise } from 'react-promise-tracker';
// import ViewAssesment from './ViewAssesment';
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
        trackPromise(
            API.get('student_find/getstudents/')
            .then(response => {
                console.log(response.data)
                this.setState({ posts: response.data })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMsg: 'Error in recieving Data' });
            }))
    }

    

    handleDelete = (data)=>{
        console.log(data);
    }

    render() {
        console.log(this.props.location)
        const { posts, errorMsg } = this.state
        console.log(posts._id);
        return (
            <Container>
                <Jumbotron>
                    
                    <h2>List of Students</h2>
                    <Button className='top-right' href="/register">Add New Student</Button>
                    <Table hover striped bordered>
                        <thead>
                            <tr>
                                <th>RollNo</th>
                                <th>Name</th>
                                <th>Body</th>
                                <th>View Assessment</th>
                                <th>Edit</th>
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
                                                <td><a href='/viewAssesment'>View Assesment</a></td>
                                                <td><EditStudent student={post}/></td>
                                                <td><Button onClick={this.handleDelete}>Delete</Button></td>
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