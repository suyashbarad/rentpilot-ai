import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

import "./OccupancyCard.css";

export default function OccupancyCard({ stats }) {

  const occupied = stats?.occupiedFlats || 0;
  const vacant = stats?.vacantFlats || 0;

  const total = occupied + vacant;

  const percentage =
    total === 0
      ? 0
      : Math.round((occupied / total) * 100);

  const data = [
    {
      name: "Occupied",
      value: occupied
    },
    {
      name: "Vacant",
      value: vacant
    }
  ];

  const COLORS = ["#10b981", "#f97316"];

  return (

    <div className="occupancy-card">

      <h2>Occupancy Rate</h2>

      <div className="occupancy-content">

        <div className="chart-box">

          <ResponsiveContainer width={220} height={220}>

            <PieChart>

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

          <div className="chart-center">

            <h1>{percentage}%</h1>

            <p>Occupied</p>

          </div>

        </div>

        <div className="occupancy-info">

          <div className="info-row">

            <span className="green-dot"></span>

            Occupied

            <strong>{occupied}</strong>

          </div>

          <div className="info-row">

            <span className="orange-dot"></span>

            Vacant

            <strong>{vacant}</strong>

          </div>

          <div className="info-row total">

            Total Flats

            <strong>{total}</strong>

          </div>

        </div>

      </div>

    </div>

  );

}