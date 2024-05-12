import axios from "axios";

// const token = localStorage.getItem("token");
// let token;   
const loginInstance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
        "Content-Type": "application/json"
    }
})
// loginInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default loginInstance;