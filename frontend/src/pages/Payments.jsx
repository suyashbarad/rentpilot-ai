import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import AddPaymentForm from "../components/payments/AddPaymentForm";
import PaymentTable from "../components/payments/PaymentTable";

import paymentService from "../services/paymentService";

import "./Payments.css";

export default function Payments() {

  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {

    try {

      const res = await paymentService.getAll();

      console.log(res.data);

      setPayments(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadPayments();

  }, []);

  const refresh = () => {

    loadPayments();

  };

  return (

    <Layout>

      <div className="payments-container">

        <h2>Payments Management</h2>

        <AddPaymentForm refresh={refresh} />

        <PaymentTable
          payments={payments}
          refresh={refresh}
        />

      </div>

    </Layout>

  );

}