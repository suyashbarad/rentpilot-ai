import { useEffect, useState } from "react";
import "./Tenants.css";

import TenantTable from "../components/tenants/TenantTable";
import AddTenantForm from "../components/tenants/AddTenantForm";

import tenantService from "../services/tenant";

export default function Tenants() {

  const [tenants, setTenants] = useState([]);

  const loadTenants = async () => {

    const res = await tenantService.getAll();

    setTenants(res.data);

  };

  useEffect(() => {

    loadTenants();

  }, []);

  return (

    <div className="tenants-container">

      <div className="tenants-header">

        <div>
          <p className="tenants-eyebrow">PROPERTY DIRECTORY</p>
          <h2>Tenant management</h2>
          <p className="tenants-subtitle">
            Add and manage residents, flats, and contact information in one place.
          </p>
        </div>

      </div>

      <section className="tenant-panel">
        <h3>Add a tenant</h3>
        <AddTenantForm refresh={loadTenants} />
      </section>

      <section className="tenant-panel tenant-list-panel">
        <div className="tenant-list-heading">
          <h3>Residents</h3>
          <span>{tenants.length} total</span>
        </div>
        <TenantTable
          tenants={tenants}
          refresh={loadTenants}
        />
      </section>

    </div>

  );

}
