import "./DashboardCards.css";

export default function DashboardCards({ data }) {
  return (
    <div className="cards">

      <div className="card">
        <h3>Buildings</h3>
        <h1>{data.totalBuildings}</h1>
      </div>

      <div className="card">
        <h3>Flats</h3>
        <h1>{data.totalFlats}</h1>
      </div>

      <div className="card">
        <h3>Tenants</h3>
        <h1>{data.totalTenants}</h1>
      </div>

      <div className="card">
        <h3>Complaints</h3>
        <h1>{data.pendingComplaints}</h1>
      </div>

    </div>
  );
}