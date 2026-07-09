import { useState } from "react";

import Layout from "../components/layout/Layout";

import AddPaymentForm from "../components/payments/AddPaymentForm";
import PaymentTable from "../components/payments/PaymentTable";

import "./Payments.css";

export default function Payments() {

  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (

    <Layout>

      <div className="payments-container">

        <h2>Payments Management</h2>

        <AddPaymentForm refresh={refresh} />

        <PaymentTable refreshKey={refreshKey} />

      </div>

    </Layout>

  );

}