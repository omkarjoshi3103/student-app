import Axios from "axios";

//"http://10.44.50.37:8084/"
export default Axios.create({
    baseURL: "http://10.44.50.37:8084/",
    responseType: "json"
});