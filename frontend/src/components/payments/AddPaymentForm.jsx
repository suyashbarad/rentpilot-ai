import { useState } from "react";
import toast from "react-hot-toast";

import paymentService from "../../services/paymentService";

import "./AddPaymentForm.css";

export default function AddPaymentForm({ refresh }) {

  const [form, setForm] = useState({
    tenant_id: "",
    month: "",
    year: "",
    amount: "",
    payment_status: "Paid",
    payment_date: "",
    payment_mode: "",
    transaction_id: ""
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

      await paymentService.create(form);

      toast.success("Payment Added");

      refresh();

      setForm({
        tenant_id: "",
        month: "",
        year: "",
        amount: "",
        payment_status: "Paid",
        payment_date: "",
        payment_mode: "",
        transaction_id: ""
      });

    } catch (err) {
  console.log(err.response?.data);
  toast.error(err.response?.data?.message || "Failed");
}

  };

  return (

    <form className="payment-form" onSubmit={handleSubmit}>

      <input
        name="tenant_id"
        placeholder="Tenant ID"
        value={form.tenant_id}
        onChange={handleChange}
      />

      <input
        name="month"
        placeholder="Month"
        value={form.month}
        onChange={handleChange}
      />

      <input
        name="year"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
      />

      <input
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <input
        type="date"
        name="payment_date"
        value={form.payment_date}
        onChange={handleChange}
      />

      <input
        name="payment_mode"
        placeholder="Cash / UPI"
        value={form.payment_mode}
        onChange={handleChange}
      />

      <input
        name="transaction_id"
        placeholder="Transaction ID"
        value={form.transaction_id}
        onChange={handleChange}
      />

      <select
        name="payment_status"
        value={form.payment_status}
        onChange={handleChange}
      >
        <option>Paid</option>
        <option>Pending</option>
        <option>Late</option>
      </select>

      <button type="submit">
        Add Payment
      </button>

    </form>

  );

}