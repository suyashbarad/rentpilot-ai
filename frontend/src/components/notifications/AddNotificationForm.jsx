import { useState } from "react";
import toast from "react-hot-toast";

import notificationService from "../../services/notificationService";

import "./AddNotificationForm.css";

export default function AddNotificationForm({ refresh }) {

  const [form, setForm] = useState({
    tenant_id: "",
    title: "",
    message: "",
    status: "Pending",
    sent_time: ""
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

      await notificationService.create(form);

      toast.success("Notification Added");

      refresh();

      setForm({
        tenant_id: "",
        title: "",
        message: "",
        status: "Pending",
        sent_time: ""
      });

    } catch {

      toast.error("Failed");

    }

  };

  return (

    <form
      className="notification-form"
      onSubmit={handleSubmit}
    >

      <input
        name="tenant_id"
        placeholder="Tenant ID"
        value={form.tenant_id}
        onChange={handleChange}
      />

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
      />

      <input
        name="status"
        placeholder="Status"
        value={form.status}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="sent_time"
        value={form.sent_time}
        onChange={handleChange}
      />

      <button>
        Add Notification
      </button>

    </form>

  );

}