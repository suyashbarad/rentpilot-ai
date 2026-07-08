import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";
import dashboardService from "../services/dashboard";

export default function Dashboard() {

  const [data, setData] = useState({
    totalBuildings: 0,
    totalFlats: 0,
    totalTenants: 0,
    pendingComplaints: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await dashboardService.getDashboard();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>

      <h1>Dashboard</h1>

      <DashboardCards data={data} />

    </Layout>
  );
}