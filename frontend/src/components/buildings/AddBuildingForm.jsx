import { useState } from "react";
import buildingService from "../../services/buildingService";
import toast from "react-hot-toast";


export default function AddBuildingForm() {
  const [form, setForm] = useState({
    building_name: "",
    address: "",
    total_floors: "",
    total_flats: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await buildingService.createBuilding(form);

      toast.success("Building Added");

      window.location.reload();

    } catch {
      toast.error("Failed");
    }
  };

  return (
      <form
        className="building-form"
        onSubmit={handleSubmit}
      >

      <input
        name="building_name"
        placeholder="Building Name"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <input
        name="total_floors"
        placeholder="Floors"
        onChange={handleChange}
      />

      <input
        name="total_flats"
        placeholder="Flats"
        onChange={handleChange}
      />

      <button>Add Building</button>

    </form>
  );
}