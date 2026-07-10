import "./ComplaintSummary.css";

export default function ComplaintSummary({ stats }) {

  const open = stats.openComplaints || 0;

  const closed = (stats.totalComplaints || 0) - open;

  return (

    <div className="complaint-summary">

      <h2>Complaint Overview</h2>

      <div className="summary-box">

        <div className="summary open">

          <h1>{open}</h1>

          <p>Open Complaints</p>

        </div>

        <div className="summary closed">

          <h1>{closed > 0 ? closed : 0}</h1>

          <p>Resolved</p>

        </div>

      </div>

    </div>

  );

}