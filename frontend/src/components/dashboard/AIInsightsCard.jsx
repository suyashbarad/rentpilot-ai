import {
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaBuilding,
  FaRobot,
  FaLightbulb
} from "react-icons/fa";

import "./AIInsightsCard.css";

export default function AIInsightsCard({ insights = [] }) {

  const getIcon = (type) => {

    switch (type) {

      case "Rent":
        return <FaMoneyBillWave />;

      case "Complaint":
        return <FaExclamationTriangle />;

      case "Occupancy":
        return <FaBuilding />;

      case "Business":
        return <FaLightbulb />;

      default:
        return <FaRobot />;
    }

  };

  return (

    <div className="ai-card">

      <div className="ai-header">

        <h2>🤖 RentPilot AI Insights</h2>

        <span>{insights.length} Insight(s)</span>

      </div>

      {

        insights.length === 0 ?

        (

          <div className="empty-ai">

            Everything looks great 🎉

          </div>

        )

        :

        (

          <div className="ai-list">

            {

              insights.map((item,index)=>(

                <div
                  className="ai-item"
                  key={index}
                >

                  <div className="ai-icon">

                    {getIcon(item.type)}

                  </div>

                  <div className="ai-content">

                    <div className="ai-type">

                      {item.type}

                    </div>

                    <div className="ai-message">

                      {item.message}

                    </div>

                    <div className="ai-recommendation">

                      💡 {item.recommendation}

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}