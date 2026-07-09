import api from "./api";

const getAll = () => api.get("/payments");

const create = (data) =>
  api.post("/payments", data);

const update = (id, data) =>
  api.put(`/payments/${id}`, data);

const remove = (id) =>
  api.delete(`/payments/${id}`);

export default {
  getAll,
  create,
  update,
  remove,
};