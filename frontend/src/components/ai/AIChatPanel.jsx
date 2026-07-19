import { useState, useRef, useEffect } from "react";
import aiService from "../../services/aiService";
import "./AIChatPanel.css";

export default function AIChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello! I'm your **RentPilot AI Assistant** powered by Google Gemini. I can help you with:\n\n• Finding tenant details\n• Checking payment statuses\n• Analyzing occupancy rates\n• Reviewing complaints\n• Property recommendations\n\nAsk me anything about your properties!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Build history for multi-turn (exclude welcome message)
      const history = newMessages
        .filter((_, i) => i > 0) // skip the welcome message
        .slice(0, -1) // exclude the current message (we send it separately)
        .map(msg => ({
          role: msg.role === "assistant" ? "model" : "user",
          content: msg.content
        }));

      const res = await aiService.chat(userMessage, history);
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: res.data.reply 
      }]);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong. Please try again.";
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `❌ **Error:** ${errorMsg}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Simple markdown-like rendering
  const renderContent = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/• /g, '&bull; ')
      .replace(/- /g, '&ndash; ');
  };

  const suggestedQuestions = [
    "How many flats are vacant?",
    "Show me pending payments",
    "Who are the tenants?",
    "Any open complaints?",
  ];

  return (
    <div className="ai-chat-panel">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="ai-avatar">✨</div>
          <div>
            <h3>RentPilot AI Assistant</h3>
            <span className="status-dot">● Powered by Google Gemini</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            {msg.role === "assistant" && <div className="bubble-avatar">✨</div>}
            <div 
              className="bubble-content"
              dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
            />
          </div>
        ))}

        {loading && (
          <div className="chat-bubble assistant">
            <div className="bubble-avatar">✨</div>
            <div className="bubble-content typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="suggested-questions">
          {suggestedQuestions.map((q, i) => (
            <button 
              key={i} 
              className="suggestion-chip"
              onClick={() => {
                setInput(q);
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask about tenants, payments, flats, complaints..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
