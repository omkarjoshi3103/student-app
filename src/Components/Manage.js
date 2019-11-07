import React from 'react';
import axios from 'axios';
import './Manage.css'
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
        axios.get('http://10.44.50.37:8084/student_ru/student/')
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
                <button className='top-right' onClick = {(evt) => this.openPage('Register',evt)}>Add New Student></button></p>
                <table border='5' className="List" align='center' cellPadding='7'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Body</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.length ?
                                posts.map(post =>
                                    <tr key={post.id}>
                                        <td align="center">{post.rollNo}</td>
                                        <td>{post.name}</td>
                                        <td>{post.branch}</td>
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

export default Manage;