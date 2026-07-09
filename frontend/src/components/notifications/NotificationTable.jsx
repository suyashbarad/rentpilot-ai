import "./NotificationTable.css";
import toast from "react-hot-toast";

import notificationService from "../../services/notificationService";

export default function NotificationTable({
  notifications,
  refresh
}) {

  const handleDelete = async (id) => {

    if (!window.confirm("Delete notification?")) return;

    try {

      await notificationService.remove(id);

      toast.success("Notification Deleted");

      refresh();

    } catch {

      toast.error("Delete Failed");

    }

  };

  return (

    <table className="notification-table">

      <thead>

        <tr>

          <th>ID</th>
          <th>Tenant</th>
          <th>Flat</th>
          <th>Title</th>
          <th>Message</th>
          <th>Status</th>
          <th>Sent Time</th>
          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {notifications.map((notification)=>(

          <tr key={notification.id}>

            <td>{notification.id}</td>
            <td>{notification.name}</td>
            <td>{notification.flat_number}</td>
            <td>{notification.title}</td>
            <td>{notification.message}</td>
            <td>{notification.status}</td>
            <td>{notification.sent_time}</td>

            <td>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(notification.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}