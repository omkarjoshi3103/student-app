import React from 'react';
import axios from 'axios';
import './Manage.css'
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
        axios.get('http://10.44.50.37:8084/assessment/')
            .then(response => {
                console.log(response.data)
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
                                    <tr key={post.studentRollNumber}>
                                        <td>{post.studentRollNumber}</td>
                                        <td>{post.unitTest}</td>
                                        <td>{post.midTermTest}</td>
                                        <td>{post.finalTest}</td>
                                        <td>{post.grade}</td>
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