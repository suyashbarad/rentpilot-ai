import api from "./api";

const getAll = () => api.get("/complaints");

const create = (data) => api.post("/complaints", data);

const remove = (id) => api.delete(`/complaints/${id}`);

export default {
  getAll,
  create,
  remove,
};

