import React, { Component } from 'react';
import Routes from "./routes/routes"
import { Router } from "react-router-dom"
import createHistory from 'history/createBrowserHistory'
class App extends Component {
    state = { loggedIn:false,
        username: ""    
    }
    history = createHistory()

    changeUsername=(username)=>{
        this.setState({username})
        console.log(this.state.username)
    }


    changeLoginState=()=>{
        this.setState({loggedIn:true})
        console.log('Inside App loggedIn', this.state)
    }
    render() { 
        return ( 
            <Router history={this.history}>
                <Routes user={this.state.username} changeUsername={this.changeUsername} />
            </Router>
        );
    }
}
 
export default App;