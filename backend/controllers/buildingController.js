const { pool } = require("../config/db");
const redis = require("../config/redis");
const redisClient = require("../config/redis");

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

  pool.query(
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

exports.getAllBuildings = async (req, res) => {
  const cached = await redisClient.get("buildings");

  if (cached) {
    return res.json({
      source: "redis",
      data: JSON.parse(cached),
    });
  }

  pool.query("SELECT * FROM buildings", async (err, results) => {
    if (err) return res.status(500).json(err);

    await redisClient.set("buildings", JSON.stringify(results), {
      EX: 60,
    });

    res.json({
      source: "mysql",
      data: results,
    });
  });
};
exports.getBuildingById = (req, res) => {       // so that a frontend will find the building using id only
  const { id } = req.params;

  pool.query(
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

  pool.query(
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

  pool.query(
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
exports.searchBuildings = (req, res) => {
  console.log("✅ Search route called");

  const keyword = req.query.keyword || "";

  pool.query(
    "SELECT * FROM buildings WHERE building_name LIKE ?",
    [`%${keyword}%`],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        data: results
      });
    }
  );
};