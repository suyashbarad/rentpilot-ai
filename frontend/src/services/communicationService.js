import api from "./api";

const sendSMS = (data) => {
  return api.post("/communication/sms", data);
};

const initiateCall = (data) => {
  return api.post("/communication/call", data);
};

export default {
  sendSMS,
  initiateCall,
};