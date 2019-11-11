import React from 'react';
import './Manage.css'
import API from '../utils/API';
// import Register from './LogReg/Register'
class Assessment extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
        API.get('/assessment/')
            .then(response => {
                console.log(response.data.data)
                this.setState({ posts: response.data.data })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMsg: 'Error in recieving Data' });
            })
    }

    render() {
        const { posts, errorMsg } = this.state
        return (
            <div className='Manage'>
                <p>List of Students are as follows: -
                </p>
                <table border='5' className="List" align='center' cellPadding='7'>
                    <thead>
                        <tr>
                            <th>Roll No.</th>
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
                                        <td>{post.student.rollNo}</td>
                                        <td>{post.assessment.unitTest}</td>
                                        <td>{post.assessment.midTermTest}</td>
                                        <td>{post.assessment.finalTest}</td>
                                        <td>{post.assessment.grade}</td>
                                        <td><button className='table-buttons'>Edit</button></td>
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
                </table>
            </div>
        )
    }

}

export default Assessment;