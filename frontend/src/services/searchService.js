import api from "./api";

const search = (q) => {
  api.get(`/search?q=${encodeURIComponent(q)}`);
  return response;
};

export default {
  search,
};