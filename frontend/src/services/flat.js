import api from "./api";

const getAll = () => api.get("/flats");

const create = (data) => api.post("/flats", data);

const remove = (id) => api.delete(`/flats/${id}`);

export default {
  getAll,
  create,
  remove,
};