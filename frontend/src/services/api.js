import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-management-2-4nfo.onrender.com/",
});

export default api;