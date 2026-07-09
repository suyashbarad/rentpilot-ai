import "./RecentComplaints.css";

export default function RecentComplaints({ complaints }) {

  return (

    <div className="recent-card">

      <h2>Recent Complaints</h2>

      <table>

        <thead>

          <tr>

            <th>Tenant</th>

            <th>Title</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {(complaints || []).map((complaint,index)=>(

            <tr key={index}>

              <td>{complaint.name}</td>

              <td>{complaint.title}</td>

              <td>{complaint.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}