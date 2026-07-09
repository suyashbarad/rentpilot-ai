import api from "./api";

const getInsights = () => api.get("/ai/insights");

export default {
  getInsights,
};