import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-platform-bapk.onrender.com/api"
});

export default API;
