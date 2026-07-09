import "./Buildings.css";

import Layout from "../components/layout/Layout";
import AddBuildingForm from "../components/buildings/AddBuildingForm";
import BuildingTable from "../components/buildings/BuildingTable";

export default function Buildings() {
  return (
    <Layout>
      <div className="buildings-container">

        <div className="buildings-header">
          <h2>Buildings Management</h2>
        </div>

        <AddBuildingForm />

        <BuildingTable />

      </div>
    </Layout>
  );
}