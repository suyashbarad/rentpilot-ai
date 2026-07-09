import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import AddVisitorForm from "../components/visitors/AddVisitorForm";
import VisitorTable from "../components/visitors/VisitorTable";

import visitorService from "../services/visitorService";

import "./Visitors.css";

export default function Visitors() {

  const [visitors,setVisitors]=useState([]);

  const loadVisitors=async()=>{

    try{

      const res=await visitorService.getAll();

      setVisitors(res.data);

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{

    loadVisitors();

  },[]);

  return(

    <Layout>

      <div className="visitors-container">

        <h2>Visitors Management</h2>

        <AddVisitorForm refresh={loadVisitors}/>

        <VisitorTable
          visitors={visitors}
          refresh={loadVisitors}
        />

      </div>

    </Layout>

  );

}