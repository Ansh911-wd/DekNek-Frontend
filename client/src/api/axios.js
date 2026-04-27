import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-3sne.onrender.com"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // ✅ FIX
  }

  return req;
});

export default API;