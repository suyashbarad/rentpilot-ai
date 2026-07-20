import { useState } from "react";
import toast from "react-hot-toast";

import tenantService from "../../services/tenant";

import EditTenantModal from "./EditTenantModal";
import CommunicationModal from "../communications/CommunicationModal";

import "./TenantTable.css";

export default function TenantTable({ tenants, refresh }) {

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [contactTenant, setContactTenant] = useState(null);

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
      <div className="tenant-table-wrap">
      <table className="tenant-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Tenant ID</th>
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
              <td>{tenant.tenant_id || "—"}</td>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.flat_id}</td>
              <td>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button
                    className="edit-btn"
                    onClick={() => setContactTenant(tenant)}
                    style={{backgroundColor: '#8b5cf6', color: 'white'}}
                  >
                    AI Contact
                  </button>
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {selectedTenant && (
        <EditTenantModal
          tenant={selectedTenant}
          refresh={refresh}
          onClose={() => setSelectedTenant(null)}
        />
      )}

      {contactTenant && (
        <CommunicationModal
          tenant={contactTenant}
          onClose={() => setContactTenant(null)}
        />
      )}
    </>
  );
}
