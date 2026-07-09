import { useState } from "react";
import toast from "react-hot-toast";

import notificationService from "../../services/notificationService";

import EditNotificationModal from "./EditNotificationModal";

import "./NotificationTable.css";

export default function NotificationTable({
  notifications,
  refresh,
}) {

  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this notification?")) return;

    try {

      await notificationService.remove(id);

      toast.success("Notification deleted");

      refresh();

    } catch {

      toast.error("Delete failed");

    }

  };

  return (

    <>

      <table className="notification-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Tenant</th>
            <th>Flat</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {notifications.map((notification) => (

            <tr key={notification.id}>

              <td>{notification.id}</td>

              <td>{notification.name}</td>

              <td>{notification.flat_number}</td>

              <td>{notification.title}</td>

              <td>{notification.status}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => setSelectedNotification(notification)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(notification.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedNotification && (

        <EditNotificationModal
          notification={selectedNotification}
          refresh={refresh}
          onClose={() => setSelectedNotification(null)}
        />

      )}

    </>

  );

}