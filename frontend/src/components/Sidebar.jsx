import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserShield,
  FaBell,
  FaSearch,
  FaRobot
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar() {

  const location = useLocation();

  const menu = [
    { path: "/dashboard", icon: <FaChartPie />, label: "Dashboard" },
    { path: "/buildings", icon: <FaBuilding />, label: "Buildings" },
    { path: "/flats", icon: <FaDoorOpen />, label: "Flats" },
    { path: "/tenants", icon: <FaUsers />, label: "Tenants" },
    { path: "/payments", icon: <FaMoneyBillWave />, label: "Payments" },
    { path: "/complaints", icon: <FaClipboardList />, label: "Complaints" },
    { path: "/visitors", icon: <FaUserShield />, label: "Visitors" },
    { path: "/notifications", icon: <FaBell />, label: "Notifications" },
    { path: "/search", icon: <FaSearch />, label: "Search" },
    { path: "/ai", icon: <FaRobot />, label: "AI Assistant" }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-circle">
          🏢
        </div>

        <div>
          <h2>RentPilot</h2>
          <span>AI Management</span>
        </div>

      </div>

      <nav>

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "active"
                : ""
            }
          >

            {item.icon}

            <span>{item.label}</span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}