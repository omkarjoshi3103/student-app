import React, { Component } from 'react';
import Routes from "./routes/routes"
import { Router } from "react-router-dom"
import createHistory from 'history/createBrowserHistory'
import Front from './Components/Front';
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
      if(this.state.loggedIn){
        this.setState({loggedIn:false}) 
      }else{
        this.setState({loggedIn:true})
      }
        /* console.log('Inside App loggedIn', this.state) */
    }
    render() { 
        return ( 
            <Router history={this.history}>
                
                <Routes 
                    {...this.state}
                    changeUsername={this.changeUsername}
                    changeLoginState={this.changeLoginState}
                />
            </Router>
        );
    }
}
 
export default App;