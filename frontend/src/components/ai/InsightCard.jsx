import "./InsightCard.css";

export default function InsightCard({ insight }) {

  return (

    <div className="insight-card">

      <h3>{insight.type}</h3>

      <p>
        <strong>Insight:</strong><br />
        {insight.message}
      </p>

      <p>
        <strong>Recommendation:</strong><br />
        {insight.recommendation}
      </p>

    </div>

  );

}