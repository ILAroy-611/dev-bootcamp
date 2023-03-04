import axios from "axios";



const instance= axios.create({
    // withCredentials:true,
    baseURL:`http://localhost:5000/api/v1/`,
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        }
})

export default instance;