import "./StatusBadge.css";

export default function StatusBadge({ status }) {

  const getClass = () => {

    switch ((status || "").toLowerCase()) {

      case "paid":
      case "completed":
      case "occupied":
      case "resolved":
      case "active":
        return "success";

      case "pending":
      case "waiting":
        return "warning";

      case "vacant":
      case "cancelled":
      case "inactive":
        return "danger";

      case "open":
        return "info";

      default:
        return "default";

    }

  };

  return (
    <span className={`status-badge ${getClass()}`}>
      {status}
    </span>
  );

}