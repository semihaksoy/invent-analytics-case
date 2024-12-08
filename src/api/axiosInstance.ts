import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

if (!API_KEY) {
    throw new Error("API key not found! Please set VITE_OMDB_API_KEY in your environment.");
}

const axiosInstance = axios.create({
    baseURL: "http://www.omdbapi.com/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
            config.params = config.params || {};
            config.params.apikey = API_KEY;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
