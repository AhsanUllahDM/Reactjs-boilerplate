import axios from "axios";
const BASE_URL_API = "http://localhost:8000/" 

const axiosConfig = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  }
);

export default axiosConfig;
