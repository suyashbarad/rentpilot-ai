import api from "./api";

const getAll = () => api.get("/notifications");

const create = (data) => api.post("/notifications", data);

const remove = (id) => api.delete(`/notifications/${id}`);

export default {
  getAll,
  create,
  remove,
};