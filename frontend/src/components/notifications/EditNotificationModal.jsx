import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import notificationService from "../../services/notificationService";

import "./EditNotificationModal.css";

export default function EditNotificationModal({
  notification,
  refresh,
  onClose,
}) {

  const [form, setForm] = useState({
    tenant_id: "",
    title: "",
    message: "",
    status: "",
    sent_time: "",
  });

  useEffect(() => {

    setForm({
      tenant_id: notification.tenant_id || "",
      title: notification.title || "",
      message: notification.message || "",
      status: notification.status || "",
      sent_time: notification.sent_time
        ? new Date(notification.sent_time)
            .toISOString()
            .slice(0,16)
        : "",
    });

  }, [notification]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await notificationService.update(
        notification.id,
        form
      );

      toast.success("Notification Updated");

      refresh();

      onClose();

    } catch {

      toast.error("Update Failed");

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Notification</h2>

        <form
          className="modal-form"
          onSubmit={handleSubmit}
        >

          <input
            name="tenant_id"
            value={form.tenant_id}
            onChange={handleChange}
            placeholder="Tenant ID"
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Sent</option>
            <option>Failed</option>
          </select>

          <input
            type="datetime-local"
            name="sent_time"
            value={form.sent_time}
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button type="submit">
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}