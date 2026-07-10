import "./DashboardHeader.css";

export default function DashboardHeader() {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12)
    greeting = "Good Morning";

  else if (hour < 18)
    greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  return (

    <div className="dashboard-header">

      <div>

        <h1>{greeting}, Admin 👋</h1>

        <p>{today}</p>

      </div>

      <div className="profile-box">

        <span className="notification">

          🔔

        </span>

        <div className="avatar">

          A

        </div>

      </div>

    </div>

  );

}