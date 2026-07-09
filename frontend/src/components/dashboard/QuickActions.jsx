import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaBell
} from "react-icons/fa";

import "./QuickActions.css";

export default function QuickActions() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Buildings",
      icon: <FaBuilding />,
      path: "/buildings"
    },

    {
      title: "Flats",
      icon: <FaDoorOpen />,
      path: "/flats"
    },

    {
      title: "Tenants",
      icon: <FaUsers />,
      path: "/tenants"
    },

    {
      title: "Payments",
      icon: <FaMoneyBillWave />,
      path: "/payments"
    },

    {
      title: "Complaints",
      icon: <FaClipboardList />,
      path: "/complaints"
    },

    {
      title: "Notifications",
      icon: <FaBell />,
      path: "/notifications"
    }

  ];

  return (

    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="quick-grid">

        {actions.map((action) => (

          <button
            key={action.title}
            className="quick-card"
            onClick={() => navigate(action.path)}
          >

            <div className="quick-icon">

              {action.icon}

            </div>

            <span>{action.title}</span>

          </button>

        ))}

      </div>

    </div>

  );

}