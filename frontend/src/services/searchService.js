import api from "./api";

const search = (q) => api.get(`/Search?q=${q}`);

export default {
  Search,
};