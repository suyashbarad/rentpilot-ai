import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import aiService from "../services/aiService";

import InsightCard from "../components/ai/InsightCard";

import "./AI.css";

export default function AI() {

  const [insights, setInsights] = useState([]);

  const loadInsights = async () => {

    try {

      const res = await aiService.getInsights();

      console.log(res.data);

      setInsights(res.data);

      setInsights(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadInsights();

  }, []);

  return (

    <Layout>

      <div className="ai-container">

        <h2>🤖 RentPilot AI Insights</h2>

        {insights.map((item, index) => (

          <InsightCard
            key={index}
            insight={item}
          />

        ))}

      </div>

    </Layout>

  );

}