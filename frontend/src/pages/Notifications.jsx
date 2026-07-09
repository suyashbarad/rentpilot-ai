import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import AddNotificationForm from "../components/notifications/AddNotificationForm";
import NotificationTable from "../components/notifications/NotificationTable";

import notificationService from "../services/notificationService";

import "./Notifications.css";

export default function Notifications() {

  const [notifications,setNotifications]=useState([]);

  const loadNotifications=async()=>{

    try{

      const res=await notificationService.getAll();

      setNotifications(res.data);

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{

    loadNotifications();

  },[]);

  return(

    <Layout>

      <div className="notifications-container">

        <h2>Notifications Management</h2>

        <AddNotificationForm refresh={loadNotifications}/>

        <NotificationTable
          notifications={notifications}
          refresh={loadNotifications}
        />

      </div>

    </Layout>

  );

}