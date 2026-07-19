import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import aiService from "../services/aiService";
import InsightCard from "../components/ai/InsightCard";
import AIChatPanel from "../components/ai/AIChatPanel";

import "./AI.css";

export default function AI() {

  const [insights, setInsights] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");

  const loadInsights = async () => {
    try {
      const res = await aiService.getInsights();
      setInsights(res.data.insights || []);
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

        <div className="ai-header">
          <h2>🤖 RentPilot AI</h2>
          <div className="ai-tabs">
            <button 
              className={`ai-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 AI Assistant
            </button>
            <button 
              className={`ai-tab ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveTab('insights')}
            >
              📊 Insights
            </button>
          </div>
        </div>

        {activeTab === "chat" && (
          <AIChatPanel />
        )}

        {activeTab === "insights" && (
          <div className="insights-grid">
            {insights.length === 0 ? (
              <p className="no-data">No AI insights available.</p>
            ) : (
              insights.map((item, index) => (
                <InsightCard
                  key={index}
                  insight={item}
                />
              ))
            )}
          </div>
        )}

      </div>
    </Layout>
  );
}