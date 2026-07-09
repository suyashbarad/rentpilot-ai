import api from "./api";

const search = (q) => api.get(`/search?q=${q}`);

export default {
  search,
};