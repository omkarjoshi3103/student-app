import React, { Component } from 'react';
import API from '../utils/API';
import { ButtonToolbar, Button } from 'react-bootstrap';


class Delete extends Component {

    handleDelete=(event)=> {
        event.preventDefault();

        if(window.confirm("Are you sure???")){
            API.delete('student_cd/delete/'+this.props.student.studentId,
            {headers:{
                'Content-Type': 'application/json',
                Authorization: "Bearer "+ sessionStorage.getItem('token')
            }}).then(response=>{
                console.log(response);
                console.log("Student Deleted");
                window.location.reload();
            }).catch(error => {
                console.log(error);
                this.setState({ errorMsg: 'Error in recieving Data' });
            })
        }
        
    }
    render() {
        return (
            <ButtonToolbar>
                <Button variant="danger" onClick={this.handleDelete}>
                    Delete
                </Button>
            </ButtonToolbar>
        );
    }
}

export default Delete;