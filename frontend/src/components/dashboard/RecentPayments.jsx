import "./RecentPayments.css";

export default function RecentPayments({ payments }) {

  return (

    <div className="recent-card">

      <h2>Recent Payments</h2>

      <table>

        <thead>

          <tr>

            <th>Tenant</th>

            <th>Amount</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {(payments || []).map((payment,index)=>(

            <tr key={index}>

              <td>{payment.name}</td>

              <td>₹ {payment.amount}</td>

              <td>{payment.payment_status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}