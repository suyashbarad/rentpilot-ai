import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import tenantService from "../../services/tenant";

import "./EditTenantModal.css";

export default function EditTenantModal({
  tenant,
  refresh,
  onClose,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    flat_id: "",
    aadhaar: "",
    occupation: "",
    family_members: "",
    joining_date: "",
    agreement_end: "",
  });

  useEffect(() => {
    setForm({
      name: tenant.name || "",
      email: tenant.email || "",
      phone: tenant.phone || "",
      flat_id: tenant.flat_id || "",
      aadhaar: tenant.aadhaar || "",
      occupation: tenant.occupation || "",
      family_members: tenant.family_members || "",
      joining_date: tenant.joining_date
        ? tenant.joining_date.substring(0, 10)
        : "",
      agreement_end: tenant.agreement_end
        ? tenant.agreement_end.substring(0, 10)
        : "",
    });
  }, [tenant]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await tenantService.update(tenant.id, form);

      toast.success("Tenant Updated");
      refresh();
      onClose();
    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Tenant</h2>

        <form
          className="modal-form"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            placeholder="Flat ID"
          />

          <input
            name="aadhaar"
            value={form.aadhaar}
            onChange={handleChange}
            placeholder="Aadhaar"
          />

          <input
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="Occupation"
          />

          <input
            name="family_members"
            value={form.family_members}
            onChange={handleChange}
            placeholder="Family Members"
          />

          <input
            type="date"
            name="joining_date"
            value={form.joining_date}
            onChange={handleChange}
          />

          <input
            type="date"
            name="agreement_end"
            value={form.agreement_end}
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
