import axios from "axios";

const backendinstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

export default backendinstance;
