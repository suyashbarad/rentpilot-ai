import { useState } from "react";
import toast from "react-hot-toast";

import visitorService from "../../services/visitorService";

import "./AddVisitorForm.css";

export default function AddVisitorForm({ refresh }) {

  const [form, setForm] = useState({
    tenant_id: "",
    visitor_name: "",
    phone: "",
    vehicle_number: "",
    entry_time: "",
    exit_time: ""
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

      await visitorService.create(form);

      toast.success("Visitor Added");

      refresh();

      setForm({
        tenant_id: "",
        visitor_name: "",
        phone: "",
        vehicle_number: "",
        entry_time: "",
        exit_time: ""
      });

    } catch {

      toast.error("Failed");

    }

  };

  return (

    <form
      className="visitor-form"
      onSubmit={handleSubmit}
    >

      <input
        name="tenant_id"
        placeholder="Tenant ID"
        value={form.tenant_id}
        onChange={handleChange}
      />

      <input
        name="visitor_name"
        placeholder="Visitor Name"
        value={form.visitor_name}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="vehicle_number"
        placeholder="Vehicle Number"
        value={form.vehicle_number}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="entry_time"
        value={form.entry_time}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="exit_time"
        value={form.exit_time}
        onChange={handleChange}
      />

      <button>
        Add Visitor
      </button>

    </form>

  );

}