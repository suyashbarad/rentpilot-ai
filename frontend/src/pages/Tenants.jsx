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

        <h2>Tenants Management</h2>

        <AddTenantForm refresh={loadTenants} />

      </div>

      <TenantTable
        tenants={tenants}
        refresh={loadTenants}
      />

    </div>

  );

}