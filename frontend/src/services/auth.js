import api from "./api";

const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

const getToken = () => {
  return localStorage.getItem("token");
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  login,
  getToken,
  logout,
};

export { login, getToken, logout };