import axios from "axios";

const backendinstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000,
});

export default backendinstance;
