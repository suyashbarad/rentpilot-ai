import "./FlatTable.css";
import toast from "react-hot-toast";
import flatService from "../../services/flat";

export default function FlatTable({ flats, refresh }) {

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this flat?")) return;

    try {

      await flatService.remove(id);

      toast.success("Flat deleted");

      refresh();

    } catch {

      toast.error("Delete failed");

    }

  };

  return (

    <table className="flat-table">

      <thead>

        <tr>
          <th>ID</th>
          <th>Building</th>
          <th>Flat No.</th>
          <th>Floor</th>
          <th>Rent</th>
          <th>Deposit</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

      </thead>

      <tbody>

        {flats.map((flat) => (

          <tr key={flat.id}>

            <td>{flat.id}</td>

            <td>{flat.building_name}</td>

            <td>{flat.flat_number}</td>

            <td>{flat.floor}</td>

            <td>₹ {flat.rent_amount}</td>

            <td>₹ {flat.deposit}</td>

            <td>{flat.status}</td>

            <td>

              <button
                className="delete-btn"
                onClick={() => handleDelete(flat.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}