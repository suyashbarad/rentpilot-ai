import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCards from "../components/dashboard/StatCards";
import RevenueChart from "../components/dashboard/RevenueChart";
import OccupancyChart from "../components/dashboard/OccupancyChart";
import RecentPayments from "../components/dashboard/RecentPayments";
import RecentComplaints from "../components/dashboard/RecentComplaints";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import QuickActions from "../components/dashboard/QuickActions";

import dashboardService from "../services/dashboard";

import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const statsRes =
        await dashboardService.getDashboard();

      const analyticsRes =
        await dashboardService.getAnalytics();

      setStats(statsRes);
      setAnalytics(analyticsRes);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <Layout>

      <div className="dashboard-page">

        <DashboardHeader />

        <StatCards
          stats={stats}
          analytics={analytics}
        />

        <div className="dashboard-row">

          <RevenueChart analytics={analytics} />

          <AIInsightsCard />

        </div>

        <div className="dashboard-row">

          <RecentPayments />

          <RecentComplaints />

        </div>

        <div className="dashboard-row">

          <OccupancyChart stats={stats} />

          <QuickActions />

        </div>

      </div>

    </Layout>

  );

}