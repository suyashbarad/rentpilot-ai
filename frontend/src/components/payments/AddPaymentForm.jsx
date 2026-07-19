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
    <div className="payment-form-container">
      <h3>Add New Payment</h3>
      <form className="payment-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Tenant ID</label>
          <input
            name="tenant_id"
            placeholder="e.g. 1"
            value={form.tenant_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Month</label>
          <input
            name="month"
            placeholder="e.g. January"
            value={form.month}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            name="year"
            placeholder="e.g. 2024"
            value={form.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Date</label>
          <input
            type="date"
            name="payment_date"
            value={form.payment_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Payment Mode</label>
          <input
            name="payment_mode"
            placeholder="Cash / UPI"
            value={form.payment_mode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Transaction ID</label>
          <input
            name="transaction_id"
            placeholder="Optional"
            value={form.transaction_id}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
          >
            <option>Paid</option>
            <option>Pending</option>
            <option>Late</option>
          </select>
        </div>

        <button type="submit">
          Add Payment
        </button>

      </form>
    </div>
  );

}