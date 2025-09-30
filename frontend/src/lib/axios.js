// api.js
import axios from "axios";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const axiosInstance = axios.create({
    baseURL: "https://talksphere-w0v8.onrender.com/api",
    withCredentials: true,                // fixed typo
});

export default axiosInstance;
