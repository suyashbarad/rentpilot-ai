import {
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave
} from "react-icons/fa";

import "./QuickActions.css";

export default function QuickActions() {

  const actions = [

    {
      title: "Add Building",
      icon: <FaBuilding />,
      color: "#2563eb"
    },

    {
      title: "Add Flat",
      icon: <FaDoorOpen />,
      color: "#7c3aed"
    },

    {
      title: "Add Tenant",
      icon: <FaUsers />,
      color: "#16a34a"
    },

    {
      title: "Record Payment",
      icon: <FaMoneyBillWave />,
      color: "#f59e0b"
    }

  ];

  return (

    <div className="quick-card">

      <h2>Quick Actions</h2>

      <div className="quick-grid">

        {actions.map((item, index) => (

          <button
            key={index}
            className="quick-btn"
          >

            <span
              className="quick-icon"
              style={{
                background: item.color
              }}
            >
              {item.icon}
            </span>

            <span>{item.title}</span>

          </button>

        ))}

      </div>

    </div>

  );

}