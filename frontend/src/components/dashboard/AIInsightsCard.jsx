import "./AIInsightsCard.css";

export default function AIInsightsCard({ insights = [] }) {

  return (

    <div className="ai-card">

      <h2>🤖 RentPilot AI Insights</h2>

      {insights.length === 0 ? (

        <p>No AI insights available.</p>

      ) : (

        insights.map((item, index) => (

          <div
            className="insight"
            key={index}
          >
            <h4>{item.type}</h4>

            <p>{item.message}</p>

            <small>{item.recommendation}</small>

          </div>

        ))

      )}

    </div>

  );

}