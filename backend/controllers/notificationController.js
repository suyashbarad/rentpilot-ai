const { pool } = require("../config/db");

exports.createNotification = (req, res) => {
  const {
    tenant_id,
    title,
    message,
    status,
    sent_time
  } = req.body;

  if (!tenant_id || !title || !message) {
    return res.status(400).json({
      message: "Tenant ID, title and message are required"
    });
  }

  const sql = `
    INSERT INTO notifications
    (
      tenant_id,
      title,
      message,
      status,
      sent_time
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [
      tenant_id,
      title,
      message,
      status || "Pending",
      sent_time
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Notification created successfully"
      });
    }
  );
};

exports.getAllNotifications = (req, res) => {

  const sql = `
    SELECT
      notifications.*,
      users.name,
      flats.flat_number
    FROM notifications
    JOIN tenants ON notifications.tenant_id = tenants.id
    JOIN users ON tenants.user_id = users.id
    JOIN flats ON tenants.flat_id = flats.id
    ORDER BY notifications.id DESC
  `;

  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });

};

exports.getNotificationById = (req, res) => {

  pool.query(
    "SELECT * FROM notifications WHERE id=?",
    [req.params.id],
    (err, results) => {

      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({
          message: "Notification not found"
        });
      }

      res.json(results[0]);

    }
  );

};

exports.updateNotification = (req, res) => {

  const {
    tenant_id,
    title,
    message,
    status,
    sent_time
  } = req.body;

  pool.query(
    `UPDATE notifications
     SET tenant_id=?, title=?, message=?, status=?, sent_time=?
     WHERE id=?`,
    [
      tenant_id,
      title,
      message,
      status,
      sent_time,
      req.params.id
    ],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({
        message: "Notification updated successfully"
      });

    }
  );

};

exports.deleteNotification = (req, res) => {

  pool.query(
    "DELETE FROM notifications WHERE id=?",
    [req.params.id],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({
        message: "Notification deleted successfully"
      });

    }
  );

};