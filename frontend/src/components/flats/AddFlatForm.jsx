import { useState } from "react";
import toast from "react-hot-toast";
import flatService from "../../services/flat";

import "./AddFlatForm.css";

export default function AddFlatForm({ refresh }) {

  const [form, setForm] = useState({

    building_id: "",

    flat_number: "",

    floor: "",

    rent_amount: "",

    deposit: "",

    status: "Vacant",

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

      await flatService.create(form);

      toast.success("Flat Added");

      refresh();

      setForm({
        building_id:"",
        flat_number:"",
        floor:"",
        rent_amount:"",
        deposit:"",
        status:"Vacant"
      });

    } catch {

      toast.error("Failed");

    }

  };

  return (

    <form
      className="flat-form"
      onSubmit={handleSubmit}
    >

      <input
        name="building_id"
        placeholder="Building ID"
        value={form.building_id}
        onChange={handleChange}
      />

      <input
        name="flat_number"
        placeholder="Flat Number"
        value={form.flat_number}
        onChange={handleChange}
      />

      <input
        name="floor"
        placeholder="Floor"
        value={form.floor}
        onChange={handleChange}
      />

      <input
        name="rent_amount"
        placeholder="Rent"
        value={form.rent_amount}
        onChange={handleChange}
      />

      <input
        name="deposit"
        placeholder="Deposit"
        value={form.deposit}
        onChange={handleChange}
      />

      <button>
        Add Flat
      </button>

    </form>

  );

}