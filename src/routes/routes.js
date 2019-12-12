import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from '../Components/login'
import NotFound from '../Components/notFound'
import HomePage from '../Components/HomePage'
import Logout from '../Components/logout'
import PrivateRoute from './private-route';
import Assessment from '../Components/Assessment'
import Manage from '../Components/Manage'
import Register from '../Components/Register'
import ViewAssessment from '../Components/ViewAssessment'
class Routes extends React.Component {
    state = { 
        student:null
     }

    render() { 
        console.log(this.props.history)
        return (
            <div>
                
                
                <Switch>
                    <PrivateRoute exact path="/" user={this.props.username} component={HomePage}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/assessment" component={Assessment}/>
                    <Route path="/manage" history={this.props.history} component={Manage}/>
                    <Route path="/viewAssessment" student={this.state.student} component={ViewAssessment}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
    
            </div>
        );
    }
}
 
export default Routes;
