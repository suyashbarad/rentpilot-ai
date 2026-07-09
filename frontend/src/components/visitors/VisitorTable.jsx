import "./VisitorTable.css";
import toast from "react-hot-toast";

import visitorService from "../../services/visitorService";

export default function VisitorTable({
  visitors,
  refresh
}) {

  const handleDelete = async (id) => {

    if(!window.confirm("Delete Visitor?")) return;

    try{

      await visitorService.remove(id);

      toast.success("Visitor Deleted");

      refresh();

    }catch{

      toast.error("Delete Failed");

    }

  };

  return(

    <table className="visitor-table">

      <thead>

        <tr>

          <th>ID</th>
          <th>Tenant</th>
          <th>Flat</th>
          <th>Visitor</th>
          <th>Phone</th>
          <th>Vehicle</th>
          <th>Entry</th>
          <th>Exit</th>
          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {visitors.map((visitor)=>(

          <tr key={visitor.id}>

            <td>{visitor.id}</td>
            <td>{visitor.name}</td>
            <td>{visitor.flat_number}</td>
            <td>{visitor.visitor_name}</td>
            <td>{visitor.phone}</td>
            <td>{visitor.vehicle_number}</td>
            <td>{visitor.entry_time}</td>
            <td>{visitor.exit_time}</td>

            <td>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(visitor.id)}
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