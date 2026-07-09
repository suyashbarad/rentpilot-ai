import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import paymentService from "../../services/paymentService";

import "./PaymentTable.css";

export default function PaymentTable({ refreshKey }) {

  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {
    try {
      const res = await paymentService.getPayments();
      setPayments(res.data.data || res.data);
    } catch {
      toast.error("Failed to load payments");
    }
  };

  useEffect(() => {
    loadPayments();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      await paymentService.deletePayment(id);

      toast.success("Payment deleted");

      loadPayments();

    } catch {

      toast.error("Delete failed");

    }
  };

  return (
    <table className="payments-table">

      <thead>
<tr>
  <th>ID</th>
  <th>Tenant</th>
  <th>Flat</th>
  <th>Month</th>
  <th>Year</th>
  <th>Amount</th>
  <th>Status</th>
  <th>Date</th>
  <th>Mode</th>
  <th>Action</th>
</tr>
</thead>

<tbody>

{payments.map((payment)=>(

<tr key={payment.id}>

<td>{payment.id}</td>
<td>{payment.name}</td>
<td>{payment.flat_number}</td>
<td>{payment.month}</td>
<td>{payment.year}</td>
<td>₹ {payment.amount}</td>
<td>{payment.payment_status}</td>
<td>{payment.payment_date}</td>
<td>{payment.payment_mode}</td>

<td>
<button
className="delete-btn"
onClick={()=>handleDelete(payment.id)}
>
Delete
</button>
</td>

</tr>

))}

</tbody>

    </table>
  );

}