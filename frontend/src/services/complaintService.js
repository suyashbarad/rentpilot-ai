import api from "./api";

const getAll = () => api.get("/complaints");

const create = (data) => api.post("/complaints", data);

const remove = (id) => api.delete(`/complaints/${id}`);

const update = (id, data) =>
  api.put(`/complaints/${id}`, data);

export default {
  getAll,
  create,
  remove,
  update,
};

