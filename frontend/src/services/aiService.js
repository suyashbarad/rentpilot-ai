import api from "./api";

const getInsights = () => api.get("/ai/insights");

const chat = (message, history) => api.post("/ai/chat", { message, history });

export default {
  getInsights,
  chat,
};