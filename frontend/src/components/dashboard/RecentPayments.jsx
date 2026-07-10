import "./RecentPayments.css";

export default function RecentPayments({ payments = [] }) {

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

          {

            payments.length === 0 ?

            (

              <tr>

                <td colSpan="3">

                  No recent payments

                </td>

              </tr>

            )

            :

            (

              payments.map((item,index)=>(

                <tr key={index}>

                  <td>{item.name}</td>

                  <td>₹{item.amount}</td>

                  <td>

                    <span
                      className={
                        item.payment_status==="Paid"
                        ?
                        "badge paid"
                        :
                        "badge pending"
                      }
                    >

                      {item.payment_status}

                    </span>

                  </td>

                </tr>

              ))

            )

          }

        </tbody>

      </table>

    </div>

  );

}