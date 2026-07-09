import api from "./api";

const getAll = () => api.get("/visitors");

const create = (data) => api.post("/visitors", data);

const remove = (id) => api.delete(`/visitors/${id}`);

export default {
  getAll,
  create,
  remove,
};