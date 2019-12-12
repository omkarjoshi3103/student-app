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
import Register from '../Components/Register'
import ViewAssessment from '../Components/ViewAssessment'
class Routes extends React.Component {
    state = { 
        student:null
     }
     
    /* constructor(props){
        super(props);
        this.props.changeUsername();
        console.log(this.props)
    }  */
    render() { 
        
        return (
            <div>
                
                {/* <button onClick={this.props.changeLoginState}>login</button> */}
                <Switch>
                    {/* <PrivateRoute exact path="/" user={this.props.username} component={HomePage}/>
                    <PrivateRoute path="/logout" component={Logout}/>
                    <PrivateRoute path="/register" component={Register}/>
                    <PrivateRoute path="/assessment" component={Assessment}/>
                    <PrivateRoute path="/manage"  component={Manage}/>
                    <PrivateRoute path="/viewAssessment" student={this.state.student} component={ViewAssessment}/> */}
                    <PrivateRoute exact path="/" user={this.props.username} component={HomePage}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/assessment" component={Assessment}/>
                    <Route path="/manage"  component={Manage}/>
                    <Route path="/viewAssessment" student={this.state.student} component={ViewAssessment}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
    
            </div>
        );
    }
}
 
export default Routes;
