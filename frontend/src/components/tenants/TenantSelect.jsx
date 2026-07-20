import { useEffect, useState } from "react";

import tenantService from "../../services/tenant";

export default function TenantSelect({ value, onChange, required = true }) {
  const [tenants, setTenants] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tenantService
      .getOptions()
      .then((res) => setTenants(res.data))
      .catch(() => setHasError(true));
  }, []);

  return (
    <select
      name="tenant_id"
      value={value}
      onChange={onChange}
      required={required}
      disabled={hasError}
    >
      <option value="">
        {hasError ? "Could not load tenants" : "Select a tenant"}
      </option>
      {tenants.map((tenant) => (
        <option key={tenant.id} value={tenant.id}>
          {tenant.name}{tenant.flat_number ? ` · Flat ${tenant.flat_number}` : ""}
        </option>
      ))}
    </select>
  );
}
