const db = require("../config/db");

exports.createBuilding = (req, res) => {
  const {
    building_name,
    address,
    total_floors,
    total_flats
  } = req.body;

  if (
    !building_name ||
    !address ||
    !total_floors ||
    !total_flats
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    INSERT INTO buildings
    (building_name, address, total_floors, total_flats)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [building_name, address, total_floors, total_flats],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Building created successfully"
      });
    }
  );
};

exports.getAllBuildings = (req, res) => {

  console.log("Pagination version is running");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    db.query(
        "SELECT * FROM buildings LIMIT ? OFFSET ?",
        [limit, offset],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
            success: true,
            data: results
});
        }
    );
};
exports.getBuildingById = (req, res) => {       // so that a frontend will find the building using id only
  const { id } = req.params;

  db.query(
    "SELECT * FROM buildings WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Building not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.updateBuilding = (req, res) => {        //so that admin can update buldings
  const { id } = req.params;
  const { building_name, address, total_floors, total_flats } = req.body;

  const sql = `
    UPDATE buildings
    SET building_name = ?, address = ?, total_floors = ?, total_flats = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [building_name, address, total_floors, total_flats, id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Building updated successfully"
      });
    }
  );
};
exports.deleteBuilding = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM buildings WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Building deleted successfully"
      });
    }
  );
};