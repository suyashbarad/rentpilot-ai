import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>RentPilot AI</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/buildings">Buildings</Link>
      <Link to="/flats">Flats</Link>
      <Link to="/tenants">Tenants</Link>
      <Link to="/payments">Payments</Link>
      <Link to="/complaints">Complaints</Link>
      <Link to="/visitors">Visitors</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/search">Search</Link>
      <Link to="/ai">AI Assistant</Link>
    </div>
  );
}