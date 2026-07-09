import api from "./api";

const getDashboard = async () => {

const res=await api.get("/dashboard");

return res.data;

};

const getAnalytics = async()=>{

const res=await api.get("/dashboard/analytics");

return res.data;

};

export default{

getDashboard,

getAnalytics

};