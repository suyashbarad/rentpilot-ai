import {
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaHome,
  FaWalking
} from "react-icons/fa";

import "./StatCard.css";

export default function StatCard({ data }) {

  const cards = [

    {
      title: "Buildings",
      value: data.totalBuildings || 0,
      icon: <FaBuilding />,
      color: "#2563eb"
    },

    {
      title: "Total Flats",
      value: data.totalFlats || 0,
      icon: <FaHome />,
      color: "#7c3aed"
    },

    {
      title: "Occupied",
      value: data.occupiedFlats || 0,
      icon: <FaDoorOpen />,
      color: "#16a34a"
    },

    {
      title: "Vacant",
      value: data.vacantFlats || 0,
      icon: <FaDoorOpen />,
      color: "#f97316"
    },

    {
      title: "Tenants",
      value: data.totalTenants || 0,
      icon: <FaUsers />,
      color: "#0ea5e9"
    },

    {
      title: "Pending Rent",
      value: data.pendingPayments || 0,
      icon: <FaMoneyBillWave />,
      color: "#dc2626"
    },

    {
      title: "Complaints",
      value: data.openComplaints || 0,
      icon: <FaExclamationCircle />,
      color: "#f59e0b"
    },

    {
      title: "Visitors Today",
      value: data.visitorsToday || 0,
      icon: <FaWalking />,
      color: "#10b981"
    }

  ];

  return (

    <div className="stats-grid">

      {

        cards.map((card,index)=>(

          <div
            className="stat-card"
            key={index}
          >

            <div
              className="stat-icon"
              style={{
                background:card.color
              }}
            >

              {card.icon}

            </div>

            <div>

              <h2>{card.value}</h2>

              <p>{card.title}</p>

            </div>

          </div>

        ))

      }

    </div>

  );

}