import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import buildingService from "../../services/buildingService";

import "./EditBuildingModal.css";

export default function EditBuildingModal({
  building,
  onClose,
  refresh,
}) {
  const [form, setForm] = useState({
    building_name: "",
    address: "",
    total_floors: "",
    total_flats: "",
  });

  useEffect(() => {
    if (building) {
      setForm({
        building_name: building.building_name,
        address: building.address,
        total_floors: building.total_floors,
        total_flats: building.total_flats,
      });
    }
  }, [building]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await buildingService.updateBuilding(building.id, form);

      toast.success("Building Updated");

      refresh();

      onClose();

    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Building</h2>

        <form onSubmit={handleUpdate}>

          <input
            name="building_name"
            value={form.building_name}
            onChange={handleChange}
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            name="total_floors"
            value={form.total_floors}
            onChange={handleChange}
          />

          <input
            name="total_flats"
            value={form.total_flats}
            onChange={handleChange}
          />

          <div className="buttons">

            <button type="submit">
              Update
            </button>

            <button
              type="button"
              className="cancel"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}