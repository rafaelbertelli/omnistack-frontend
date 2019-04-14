import axios from "axios";

const api = axios.create({
  baseURL: "https://omnistack-borgera.herokuapp.com"
});

export default api;
