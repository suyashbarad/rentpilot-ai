import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import buildingService from "../../services/buildingService";

import EditBuildingModal from "./EditBuildingModal";

import "./BuildingTable.css";

export default function BuildingTable() {

  const [buildings, setBuildings] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const loadBuildings = async () => {

    try {

      const res = await buildingService.getBuildings();

      setBuildings(res.data.data || res.data);

    } catch {

      toast.error("Failed to load buildings");

    }

  };

  useEffect(() => {

    loadBuildings();

  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this building?")) return;

    try {

      await buildingService.deleteBuilding(id);

      toast.success("Building Deleted");

      loadBuildings();

    } catch {

      toast.error("Delete Failed");

    }

  };

  return (

    <>

      <table className="buildings-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Floors</th>
            <th>Flats</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {buildings.map((building) => (

            <tr key={building.id}>

              <td>{building.id}</td>

              <td>{building.building_name}</td>

              <td>{building.address}</td>

              <td>{building.total_floors}</td>

              <td>{building.total_flats}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    setSelectedBuilding(building)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(building.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedBuilding && (

        <EditBuildingModal

          building={selectedBuilding}

          refresh={loadBuildings}

          onClose={() =>
            setSelectedBuilding(null)
          }

        />

      )}

    </>

  );

}