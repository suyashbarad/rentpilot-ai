import { useState } from "react";
import toast from "react-hot-toast";

import paymentService from "../../services/paymentService";

import EditPaymentModal from "./EditPaymentModal";

import "./PaymentTable.css";

export default function PaymentTable({
  payments,
  refresh,
}) {

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this payment?")) return;

    try {

      await paymentService.remove(id);

      toast.success("Payment deleted");

      refresh();

    } catch {

      toast.error("Delete failed");

    }

  };

  return (

    <>

      <table className="payment-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Tenant</th>
            <th>Flat</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment) => (

            <tr key={payment.id}>

              <td>{payment.id}</td>

              <td>{payment.name}</td>

              <td>{payment.flat_number}</td>

              <td>{payment.month}</td>

              <td>{payment.year}</td>

              <td>₹ {payment.amount}</td>

              <td>{payment.payment_status}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => setSelectedPayment(payment)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(payment.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedPayment && (

        <EditPaymentModal
          payment={selectedPayment}
          refresh={refresh}
          onClose={() => setSelectedPayment(null)}
        />

      )}

    </>

  );

}