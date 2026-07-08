import api from "./api";

const getBuildings = () => api.get("/buildings");

const createBuilding = (data) =>
  api.post("/buildings", data);

const deleteBuilding = (id) =>
  api.delete(`/buildings/${id}`);

export default {
  getBuildings,
  createBuilding,
  deleteBuilding,
};