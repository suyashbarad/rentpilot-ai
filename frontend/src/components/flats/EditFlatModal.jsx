import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import flatService from "../../services/flat";

import "./EditFlatModal.css";

export default function EditFlatModal({
  flat,
  onClose,
  refresh,
}) {

  const [form, setForm] = useState({
    building_id: "",
    flat_number: "",
    floor: "",
    rent_amount: "",
    deposit: "",
    status: "",
  });

  useEffect(() => {

    if (flat) {

      setForm({
        building_id: flat.building_id,
        flat_number: flat.flat_number,
        floor: flat.floor,
        rent_amount: flat.rent_amount,
        deposit: flat.deposit,
        status: flat.status,
      });

    }

  }, [flat]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await flatService.update(flat.id, form);

      toast.success("Flat Updated");

      refresh();

      onClose();

    } catch {

      toast.error("Update Failed");

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Flat</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="building_id"
            value={form.building_id}
            onChange={handleChange}
          />

          <input
            name="flat_number"
            value={form.flat_number}
            onChange={handleChange}
          />

          <input
            name="floor"
            value={form.floor}
            onChange={handleChange}
          />

          <input
            name="rent_amount"
            value={form.rent_amount}
            onChange={handleChange}
          />

          <input
            name="deposit"
            value={form.deposit}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option>Vacant</option>
            <option>Occupied</option>

          </select>

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