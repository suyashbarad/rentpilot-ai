import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import complaintService from "../../services/complaintService";
import "./EditComplaintModal.css";

export default function EditComplaintModal({
  complaint,
  refresh,
  onClose,
}) {

  const [form, setForm] =useState({
    tenant_id:"",
    title:"",
    description:"",
    priority:"",
    status:"",
  });

  useEffect(()=>{

    setForm({
      tenant_id:complaint.tenant_id || "",
      title:complaint.title || "",
      description:complaint.description || "",
      priority:complaint.priority || "",
      status:complaint.status || "",
    });

  },[complaint]);

  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value,
    });

  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      await complaintService.update(
        complaint.id,
        form
      );

      toast.success("Complaint Updated");

      refresh();

      onClose();

    }catch{

      toast.error("Update Failed");

    }

  };

  return(

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Complaint</h2>

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
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
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