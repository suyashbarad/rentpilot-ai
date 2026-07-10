import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeCard from "../components/dashboard/WelcomeCard";
// import DashboardCards from "../components/dashboard/DashboardCards";
import StatCard from "../components/dashboard/StatCard";
import OccupancyCard from "../components/dashboard/OccupancyCard";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentPayments from "../components/dashboard/RecentPayments";
import RecentComplaints from "../components/dashboard/RecentComplaints";
import SkeletonCard from "../components/dashboard/SkeletonCard";

import dashboardService from "../services/dashboard";

import "./Dashboard.css";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);

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
        statsData,
        analyticsData,
        recentData
      ] = await Promise.all([
        dashboardService.getDashboard(),
        dashboardService.getAnalytics(),
        dashboardService.getRecent()
      ]);

      setStats(statsData);
      setAnalytics(analyticsData);
      setRecent(recentData);

      try {
        const ai = await dashboardService.getInsights();
        setInsights(ai.insights || []);
      } catch {
        setInsights([]);
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);

  };

  return (

    <Layout>

      <DashboardHeader />

      <WelcomeCard />

      {

        loading ?

        <SkeletonCard />

        :

        <>

          <StatCard data={stats} />

          <div className="dashboard-row">

            <OccupancyCard
              analytics={analytics}
            />

            <AIInsightsCard
              insights={insights}
            />

          </div>

          <QuickActions />

          <div className="dashboard-row">

            <RecentPayments
              payments={recent.payments}
            />

            <RecentComplaints
              complaints={recent.complaints}
            />

          </div>

        </>

      }

    </Layout>

  );

}