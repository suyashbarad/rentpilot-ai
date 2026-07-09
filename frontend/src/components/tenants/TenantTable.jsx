import { useState } from "react";
import toast from "react-hot-toast";

import tenantService from "../../services/tenant";

import EditTenantModal from "./EditTenantModal";

import "./TenantTable.css";

export default function TenantTable({ tenants, refresh }) {

  const [selectedTenant, setSelectedTenant] = useState(null);

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

    <>

      <table className="tenant-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Flat ID</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {tenants.map((tenant) => (

            <tr key={tenant.id}>

              <td>{tenant.id}</td>

              <td>{tenant.name}</td>

              <td>{tenant.email}</td>

              <td>{tenant.phone}</td>

              <td>{tenant.flat_id}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => setSelectedTenant(tenant)}
                >
                  Edit
                </button>

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

      {selectedTenant && (

        <EditTenantModal
          tenant={selectedTenant}
          refresh={refresh}
          onClose={() => setSelectedTenant(null)}
        />

      )}

    </>

  );

}