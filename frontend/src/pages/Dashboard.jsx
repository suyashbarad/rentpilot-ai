import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import OccupancyCard from "../components/dashboard/OccupancyCard";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentPayments from "../components/dashboard/RecentPayments";
import RecentComplaints from "../components/dashboard/RecentComplaints";
import ComplaintSummary from "../components/dashboard/ComplaintSummary";
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

        console.log("AI API Response:", ai);
        console.log("Is Array?", Array.isArray(ai));

        setInsights(Array.isArray(ai) ? ai : (ai.insights || []));
      } catch {
        setInsights([]);
        console.log("AI Response:", ai);
        console.log("Insights:", ai.insights);
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
              stats={stats}
              analytics={analytics}
            />

            <ComplaintSummary
              stats={stats}
            />

          </div>

          <div className="dashboard-row">

            <AIInsightsCard
              insights={insights}
            />

            <QuickActions />

          </div>

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