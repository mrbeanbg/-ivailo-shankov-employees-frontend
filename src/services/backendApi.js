import axios from 'axios';

//apply base url for axios
const backendApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_BASE_URL,
});

export default backendApi;