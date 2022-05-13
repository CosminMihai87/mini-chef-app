import axios from 'axios';

const axiosInstance = (baseURL) => axios.create({
  baseURL: baseURL
});

export default axiosInstance;