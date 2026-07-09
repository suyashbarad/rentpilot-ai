import "./OccupancyCard.css";

export default function OccupancyCard({ analytics }) {

  const rate = analytics.occupancyRate || 0;

  return (

    <div className="occupancy-card">

      <h2>Occupancy Rate</h2>

      <h1>{rate}%</h1>

      <div className="progress">

        <div

          className="progress-fill"

          style={{width:`${rate}%`}}

        ></div>

      </div>

    </div>

  );

}