import Axios from "axios";


export default Axios.create({
    baseURL: "http://10.44.50.37:8084/",
    responseType: "json"
});