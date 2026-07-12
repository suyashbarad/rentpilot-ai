// import axios from "axios";

// const api = axios.create({
//   // baseURL: "https://localhost:5173/api"
//   baseURL: "http://localhost:5001/api"

// });

// api.interceptors.request.use((config) => {

//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;

// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://rentpilot-ai-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
