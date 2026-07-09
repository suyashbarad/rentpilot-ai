import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import AddComplaintForm from "../components/complaints/AddComplaintForm";
import ComplaintTable from "../components/complaints/ComplaintTable";

import complaintService from "../services/complaintService";

import "./Complaints.css";

export default function Complaints() {

  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {

    try {

      const res = await complaintService.getAll();

      setComplaints(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadComplaints();

  }, []);

  return (

    <Layout>

      <div className="complaints-container">

        <h2>Complaints Management</h2>

        <AddComplaintForm refresh={loadComplaints} />

        <ComplaintTable
          complaints={complaints}
          refresh={loadComplaints}
        />

      </div>

    </Layout>

  );

}