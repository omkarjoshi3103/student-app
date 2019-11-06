import React from 'react';
import axios from 'axios';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => {
                this.setState({ posts: response.data })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMsg: 'Error in recieving Data' });
            })
    }

    render() {
        const { posts } = this.state;
        return (
            <div className='Profile'>
                <h3>Your Profile is as follows: - </h3>

                {
                    posts.length ?
                        posts.map(post =>
                            <div key={post.id}>
                                ID: {post.id} &ensp;
                                Name: {post.name} <br/>
                                e-mail: {post.email} <br/><br/>
                            </div>
                        ) :
                        null
                }

            </div>
        )
    }
}

export default Profile;