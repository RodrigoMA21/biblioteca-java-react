import axios from "axios";

const api = axios.create({
  baseURL: "https://biblioteca-java-react.onrender.com"
});

// 👉 Interceptor: adiciona token em todas requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
