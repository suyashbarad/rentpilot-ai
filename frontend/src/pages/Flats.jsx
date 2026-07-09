import { useEffect, useState } from "react";
import FlatTable from "../components/flats/FlatTable";
import AddFlatForm from "../components/flats/AddFlatForm";
import flatService from "../services/flat";
import "./Flats.css";

export default function Flats() {
  const [flats, setFlats] = useState([]);

  const loadFlats = async () => {
    const res = await flatService.getAll();
    setFlats(res.data);
  };

  useEffect(() => {
    loadFlats();
  }, []);

  return (
    <div className="flats-container">
      <div className="flats-header">
        <h2>Flats Management</h2>

        <AddFlatForm refresh={loadFlats} />
      </div>

      <FlatTable
        flats={flats}
        refresh={loadFlats}
      />
    </div>
  );
}