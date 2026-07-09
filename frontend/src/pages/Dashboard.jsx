import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import StatCard from "../components/dashboard/StatCard";
import RevenueCard from "../components/dashboard/RevenueCard";
import OccupancyCard from "../components/dashboard/OccupancyCard";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentPayments from "../components/dashboard/RecentPayments";
import RecentComplaints from "../components/dashboard/RecentComplaints";

import dashboardService from "../services/dashboard";

import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [recent, setRecent] = useState({
    payments: [],
    complaints: []
  });
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        statsRes,
        analyticsRes,
        recentRes,
        insightsRes
      ] = await Promise.all([

        dashboardService.getDashboard(),
        dashboardService.getAnalytics(),
        dashboardService.getRecent(),
        dashboardService.getInsights()

      ]);

      setStats(statsRes);
      setAnalytics(analyticsRes);
      setRecent(recentRes);
      setInsights(insightsRes);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <Layout>

      <div className="dashboard-page">

        <h1 className="dashboard-title">

          RentPilot AI Dashboard

        </h1>

        <StatCard
          stats={stats}
          analytics={analytics}
        />

        <div className="dashboard-grid">

          <RevenueCard analytics={analytics} />

          <OccupancyCard analytics={analytics} />

        </div>

        <div className="dashboard-grid">

          <AIInsightsCard insights={insights} />

          <QuickActions />

        </div>

        <div className="dashboard-grid">

          <RecentPayments
            payments={recent.payments}
          />

          <RecentComplaints
            complaints={recent.complaints}
          />

        </div>

      </div>

    </Layout>

  );

}