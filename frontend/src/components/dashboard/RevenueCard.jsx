import "./RevenueCard.css";

export default function RevenueCard({ analytics }) {

  return (

    <div className="revenue-card">

      <h2>Revenue Summary</h2>

      <div className="revenue-row">

        <div>

          <h4>Total Rent Collected</h4>

          <h1>₹ {analytics.totalRentCollected || 0}</h1>

        </div>

      </div>

      <div className="revenue-row">

        <div>

          <h4>Pending Rent</h4>

          <h1 className="pending">

            ₹ {analytics.pendingRent || 0}

          </h1>

        </div>

      </div>

    </div>

  );

}