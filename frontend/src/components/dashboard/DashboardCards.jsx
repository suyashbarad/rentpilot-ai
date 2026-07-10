import {
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaHome,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";

import "./DashboardCards.css";

export default function DashboardCards({ data }) {

  const cards = [
    {
      title: "Buildings",
      value: data.totalBuildings,
      icon: <FaBuilding />,
      color: "#2563eb",
    },
    {
      title: "Total Flats",
      value: data.totalFlats,
      icon: <FaHome />,
      color: "#16a34a",
    },
    {
      title: "Occupied Flats",
      value: data.occupiedFlats,
      icon: <FaDoorOpen />,
      color: "#9333ea",
    },
    {
      title: "Vacant Flats",
      value: data.vacantFlats,
      icon: <FaDoorOpen />,
      color: "#f97316",
    },
    {
      title: "Tenants",
      value: data.totalTenants,
      icon: <FaUsers />,
      color: "#0ea5e9",
    },
    {
      title: "Pending Payments",
      value: data.pendingPayments,
      icon: <FaMoneyBillWave />,
      color: "#dc2626",
    },
    {
      title: "Open Complaints",
      value: data.openComplaints,
      icon: <FaExclamationCircle />,
      color: "#f59e0b",
    },
    
  ];

  return (
    <div className="dashboard-grid">

      {cards.map((card) => (

        <div
          className="dashboard-card"
          key={card.title}
        >

          <div
            className="dashboard-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>

            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

          </div>

        </div>

      ))}

    </div>
  );

}