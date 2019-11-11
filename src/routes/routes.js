import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from '../Components/login'
import Front from '../Components/Front'
import NotFound from '../Components/notFound'
/* import PrivateRoute from '../components/privateRoute' */
import HomePage from '../Components/HomePage'
import Logout from '../Components/logout'
import PrivateRoute from './private-route';
import Assessment from '../Components/Assessment'
import Manage from '../Components/Manage'

class Routes extends React.Component {
    state = {  }
    /* constructor(props){
        super(props);
        this.props.changeUsername();
        console.log(this.props)
    }  */
    render() { 
        
        /* console.log('route',this.props.location) */
        return (
            <div>
                <Front/>
                {/* <button onClick={this.props.changeLoginState}>login</button> */}
                <Switch>
                    {<PrivateRoute exact path="/" user={this.props.username} component={HomePage}/>}
                    <PrivateRoute path="/logout" component={Logout}/>
                    <PrivateRoute path="/assessment" component={Assessment}/>
                    <PrivateRoute path="/manage" component={Manage}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
    
            </div>
        );
    }
}
 
export default Routes;
