import {
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaCheckCircle,
  FaWalking
} from "react-icons/fa";

import "./StatCards.css";

export default function StatCards({ stats }) {

  const cards = [

    {
      title: "Buildings",
      value: stats.totalBuildings,
      icon: <FaBuilding />,
      color: "#2563eb"
    },

    {
      title: "Total Flats",
      value: stats.totalFlats,
      icon: <FaDoorOpen />,
      color: "#7c3aed"
    },

    {
      title: "Occupied Flats",
      value: stats.occupiedFlats,
      icon: <FaCheckCircle />,
      color: "#16a34a"
    },

    {
      title: "Vacant Flats",
      value: stats.vacantFlats,
      icon: <FaDoorOpen />,
      color: "#f97316"
    },

    {
      title: "Tenants",
      value: stats.totalTenants,
      icon: <FaUsers />,
      color: "#0ea5e9"
    },

    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      icon: <FaMoneyBillWave />,
      color: "#dc2626"
    },

    {
      title: "Open Complaints",
      value: stats.openComplaints,
      icon: <FaClipboardList />,
      color: "#f59e0b"
    },

    {
      title: "Today's Visitors",
      value: stats.visitorsToday,
      icon: <FaWalking />,
      color: "#10b981"
    }

  ];

  return (

    <div className="stats-grid">

      {cards.map((card, index) => (

        <div
          key={index}
          className="stat-card"
        >

          <div
            className="icon-box"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>

            <h2>{card.value ?? 0}</h2>

            <p>{card.title}</p>

          </div>

        </div>

      ))}

    </div>

  );

}