import "./TenantTable.css";
import toast from "react-hot-toast";
import tenantService from "../../services/tenant";

export default function TenantTable({ tenants, refresh }) {

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this tenant?")) return;

    try {

      await tenantService.remove(id);

      toast.success("Tenant deleted");

      refresh();

    } catch {

      toast.error("Delete failed");

    }

  };

  return (

    <table className="tenant-table">

      <thead>

        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Flat</th>
          <th>Occupation</th>
          <th>Family</th>
          <th>Joining</th>
          <th>Agreement End</th>
          <th>Action</th>
        </tr>

      </thead>

      <tbody>

        {tenants.map((tenant) => (

          <tr key={tenant.id}>

            <td>{tenant.id}</td>
            <td>{tenant.name}</td>
            <td>{tenant.flat_number}</td>
            <td>{tenant.occupation}</td>
            <td>{tenant.family_members}</td>
            <td>{tenant.joining_date}</td>
            <td>{tenant.agreement_end}</td>

            <td>
              <button
                className="delete-btn"
                onClick={() => handleDelete(tenant.id)}
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