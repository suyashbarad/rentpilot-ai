import "./Buildings.css";

import Layout from "../components/layout/Layout";
import AddBuildingForm from "../components/buildings/AddBuildingForm";
import BuildingTable from "../components/buildings/BuildingTable";

export default function Buildings() {
  return (
    <Layout>
      <div className="buildings-container">

        <h2>Buildings Management</h2>

        <AddBuildingForm />

        <BuildingTable />

      </div>
    </Layout>
  );
}