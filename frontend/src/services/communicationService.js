import axios from "axios";

const API_URL = "http://localhost:5001/api/communication";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const sendSMS = (data) => {
    return axios.post(`${API_URL}/sms`, data, getAuthHeaders());
};

const initiateCall = (data) => {
    return axios.post(`${API_URL}/call`, data, getAuthHeaders());
};

export default {
    sendSMS,
    initiateCall
};
