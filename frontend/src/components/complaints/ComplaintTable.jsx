import "./ComplaintTable.css";
import toast from "react-hot-toast";

import complaintService from "../../services/complaintService";

export default function ComplaintTable({
  complaints,
  refresh
}) {

  const handleDelete = async (id) => {

    if(!window.confirm("Delete complaint?")) return;

    try{

      await complaintService.remove(id);

      toast.success("Complaint deleted");

      refresh();

    }catch{

      toast.error("Delete failed");

    }

  };

  return(

    <table className="complaint-table">

      <thead>

        <tr>

          <th>ID</th>

          <th>Tenant</th>

          <th>Flat</th>

          <th>Title</th>

          <th>Priority</th>

          <th>Status</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {complaints.map((complaint)=>(

          <tr key={complaint.id}>

            <td>{complaint.id}</td>

            <td>{complaint.name}</td>

            <td>{complaint.flat_number}</td>

            <td>{complaint.title}</td>

            <td>{complaint.priority}</td>

            <td>{complaint.status}</td>

            <td>

              <button
                className="delete-btn"
                onClick={()=>handleDelete(complaint.id)}
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