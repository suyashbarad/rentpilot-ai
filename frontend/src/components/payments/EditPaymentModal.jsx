import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import paymentService from "../../services/paymentService";

import "./EditPaymentModal.css";

export default function EditPaymentModal({
  payment,
  refresh,
  onClose,
}) {

  const [form, setForm] = useState({
    tenant_id: "",
    month: "",
    year: "",
    amount: "",
    payment_status: "",
    payment_date: "",
    payment_mode: "",
    transaction_id: "",
  });

  useEffect(() => {

    setForm({
      tenant_id: payment.tenant_id || "",
      month: payment.month || "",
      year: payment.year || "",
      amount: payment.amount || "",
      payment_status: payment.payment_status || "",
      payment_date: payment.payment_date
        ? payment.payment_date.substring(0,10)
        : "",
      payment_mode: payment.payment_mode || "",
      transaction_id: payment.transaction_id || "",
    });

  }, [payment]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await paymentService.update(
        payment.id,
        form
      );

      toast.success("Payment Updated");

      refresh();

      onClose();

    } catch {

      toast.error("Update Failed");

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Payment</h2>

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
            name="month"
            value={form.month}
            onChange={handleChange}
            placeholder="Month"
          />

          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year"
          />

          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
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

          <input
            type="date"
            name="payment_date"
            value={form.payment_date}
            onChange={handleChange}
          />

          <input
            name="payment_mode"
            value={form.payment_mode}
            onChange={handleChange}
            placeholder="Payment Mode"
          />

          <input
            name="transaction_id"
            value={form.transaction_id}
            onChange={handleChange}
            placeholder="Transaction ID"
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