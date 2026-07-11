import { useState } from "react";
import toast from "react-hot-toast";

import tenantService from "../../services/tenant";

import "./AddTenantForm.css";

export default function AddTenantForm({ refresh }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    flat_id: "",
    aadhaar: "",
    occupation: "",
    family_members: "",
    joining_date: "",
    agreement_end: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(form);

    try {
      await tenantService.create(form);

      toast.success("Tenant Added");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        flat_id: "",
        aadhaar: "",
        occupation: "",
        family_members: "",
        joining_date: "",
        agreement_end: ""
      });

      refresh();

    } catch (err) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  toast.error(
    err.response?.data?.message || "Failed to add tenant"
  );
}

  };

  return (

    <form
      className="tenant-form"
      onSubmit={handleSubmit}
    >

      <input
        name="name"
        placeholder="Tenant Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="flat_id"
        placeholder="Flat ID"
        value={form.flat_id}
        onChange={handleChange}
      />

      <input
        name="aadhaar"
        placeholder="Aadhaar"
        value={form.aadhaar}
        onChange={handleChange}
      />

      <input
        name="occupation"
        placeholder="Occupation"
        value={form.occupation}
        onChange={handleChange}
      />

      <input
        name="family_members"
        placeholder="Family Members"
        value={form.family_members}
        onChange={handleChange}
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

      <button type="submit">
        Add Tenant
      </button>

    </form>

  );

}