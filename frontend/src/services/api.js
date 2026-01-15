import axios from "axios";

const api = axios.create({
  baseURL: "https://biblioteca-java-react.onrender.com"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  // Adiciona token só se existir e se não for registro/login
  if (token && !config.url?.includes("/auth/register") && !config.url?.includes("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
