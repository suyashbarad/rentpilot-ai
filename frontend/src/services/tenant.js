import api from "./api";

const getAll = () => api.get("/tenants");

const getOptions = () => api.get("/tenants/options");

const create = (data) => api.post("/tenants", data);

const update = (id, data) =>
  api.put(`/tenants/${id}`, data);

const remove = (id) =>
  api.delete(`/tenants/${id}`);

export default {
  getAll,
  getOptions,
  create,
  update,
  remove,
};
