import api from "./api";

const getAll = () => api.get("/flats");

const create = (data) => api.post("/flats", data);

const update = (id, data) =>
  api.put(`/flats/${id}`, data);

const remove = (id) =>
  api.delete(`/flats/${id}`);

export default {
  getAll,
  create,
  update,
  remove,
};