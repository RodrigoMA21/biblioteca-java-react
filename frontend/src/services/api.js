import axios from "axios";

// Cria instância do Axios apontando para o backend no Render
const api = axios.create({
  baseURL: "https://biblioteca-java-react-1.onrender.com" // ajuste para seu backend
});

// 👉 Interceptor: adiciona token em todas requisições, exceto registro/login
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  // Ignora token para endpoints de registro e login
  if (token && !config.url?.includes("/auth/register") && !config.url?.includes("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
