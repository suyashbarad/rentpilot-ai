import api from "./api";

const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

const getAnalytics = async () => {
  const response = await api.get("/dashboard/analytics");
  return response.data;
};

const getRecent = async () => {
  const response = await api.get("/dashboard/recent");
  return response.data;
};

const getInsights = async () => {
  const response = await api.get("/ai/insights");
  return response.data;
};

export default {
  getDashboard,
  getAnalytics,
  getRecent,
  getInsights
};