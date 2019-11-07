import API from '../utils/API'

 const authUser = (username, password) => {
    API.post("/assessment/login", {
        "username": username,
        "password": password
    }).then((response) => {
        /* console.log(response.data.message); */
        let data = response.data.message
        if(data === "exist"){
            localStorage.setItem('token',username)
            /* this.props.changeUsername(this.state.username); */
            /* console.log('props in login',this.props) */
            
            
        }
    }, (error) => {
        //console.log(error.response.status);
        let errorStatus = error.response.status;
        let err = {}
        switch(errorStatus){
            case 404:
                console.log("Hi")
                err = {errorMsg:"User does not exist"}
                return err;
            case 401:
                err = {errorMsg:"User and Password Mismatch"}
                return err; 
            default:
                break;
        }
    });
}


export default authUser;