import api from "./api";

const getPayments = () => api.get("/payments");

const createPayment = (data) =>
  api.post("/payments", data);

const deletePayment = (id) =>
  api.delete(`/payments/${id}`);

export default {
  getPayments,
  createPayment,
  deletePayment
};