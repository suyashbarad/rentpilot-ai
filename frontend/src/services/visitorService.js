import api from "./api";

const getAll = () => api.get("/visitors");

const create = (data) => api.post("/visitors", data);

const remove = (id) => api.delete(`/visitors/${id}`);

const update = (id, data) =>
  api.put(`/visitors/${id}`, data);

export default {
  getAll,
  create,
  remove,
  update,
};