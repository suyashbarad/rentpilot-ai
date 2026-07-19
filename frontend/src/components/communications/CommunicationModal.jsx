import { useState } from "react";
import toast from "react-hot-toast";
import communicationService from "../../services/communicationService";
import "./CommunicationModal.css";

export default function CommunicationModal({ tenant, onClose }) {
  const [method, setMethod] = useState("sms");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === "sms") {
        await communicationService.sendSMS({
          tenant_id: tenant.id,
          phone: tenant.phone || "+1234567890", // fallback for testing
          messageContext: context
        });
        toast.success("AI SMS Sent!");
      } else {
        await communicationService.initiateCall({
          tenant_id: tenant.id,
          phone: tenant.phone || "+1234567890", // fallback for testing
          callContext: context
        });
        toast.success("AI Call Initiated!");
      }
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Communication failed";
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Contact {tenant.name}</h3>
        <p className="subtitle">AI Assistant powered by Twilio & OpenAI</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="sms">AI SMS Message</option>
              <option value="call">AI Voice Call</option>
            </select>
          </div>

          <div className="form-group">
            <label>Context / Instructions</label>
            <textarea 
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., Remind them about the pending rent of ₹15,000 for January."
              required
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send via AI"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
