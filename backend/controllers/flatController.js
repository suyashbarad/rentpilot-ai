const db = require("../config/db");

exports.createFlat = (req, res) => {
  const {
    building_id,
    flat_number,
    floor,
    rent_amount,
    deposit,
    status
  } = req.body;

  if (
    !building_id ||
    !flat_number ||
    floor == null ||
    rent_amount == null ||
    deposit == null
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    INSERT INTO flats
    (building_id, flat_number, floor, rent_amount, deposit, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      building_id,
      flat_number,
      floor,
      rent_amount,
      deposit,
      status || "Vacant"
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Flat created successfully"
      });
    }
  );
};
exports.getAllFlats = (req, res) => {
  const sql = `
    SELECT
      flats.*,
      buildings.building_name
    FROM flats
    JOIN buildings
      ON flats.building_id = buildings.id
    ORDER BY flats.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};
exports.getFlatById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM flats WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Flat not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.updateFlat = (req, res) => {
  const { id } = req.params;
  const {
    building_id,
    flat_number,
    floor,
    rent_amount,
    deposit,
    status
  } = req.body;

  const sql = `
    UPDATE flats
    SET building_id = ?, flat_number = ?, floor = ?, rent_amount = ?, deposit = ?, status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [building_id, flat_number, floor, rent_amount, deposit, status, id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Flat updated successfully"
      });
    }
  );
};
exports.deleteFlat = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM flats WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Flat deleted successfully"
      });
    }
  );
};