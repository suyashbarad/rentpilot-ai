import "./OccupancyCard.css";

export default function OccupancyCard({ analytics }) {

  const rate = analytics.occupancyRate || 0;

  return (

    <div className="occupancy-card">

      <h2>Occupancy Rate</h2>

      <div className="circle">

        <svg>

          <circle
            cx="90"
            cy="90"
            r="70"
          />

          <circle
            cx="90"
            cy="90"
            r="70"
            style={{
              strokeDashoffset:
              440-(440*rate)/100
            }}
          />

        </svg>

        <h1>

          {rate}%

        </h1>

      </div>

    </div>

  );

}