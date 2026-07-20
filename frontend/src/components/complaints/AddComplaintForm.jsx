import { useState } from "react";
import toast from "react-hot-toast";

import complaintService from "../../services/complaintService";
import TenantSelect from "../tenants/TenantSelect";

import "./AddComplaintForm.css";

export default function AddComplaintForm({ refresh }) {

  const [form, setForm] = useState({
    tenant_id: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Open"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await complaintService.create(form);

      toast.success("Complaint Added");

      refresh();

      setForm({
        tenant_id: "",
        title: "",
        description: "",
        priority: "Medium",
        status: "Open"
      });

    } catch {

      toast.error("Failed");

    }

  };

  return (

    <form
      className="complaint-form"
      onSubmit={handleSubmit}
    >

      <TenantSelect
        value={form.tenant_id}
        onChange={handleChange}
      />

      <input
        name="title"
        placeholder="Complaint Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>

      <button>
        Add Complaint
      </button>

    </form>

  );

}
