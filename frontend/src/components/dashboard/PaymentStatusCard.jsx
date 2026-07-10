import "./PaymentStatusCard.css";

export default function PaymentStatusCard({

stats

}){

const paid=

stats.totalTenants-
stats.pendingPayments;

const pending=
stats.pendingPayments;

const total=
stats.totalTenants||1;

const paidPercent=
(paid/total)*100;

const pendingPercent=
(pending/total)*100;

return(

<div className="payment-card">

<h2>

Payment Status

</h2>

<div className="progress-item">

<p>

Paid

</p>

<div className="progress">

<div
style={{

width:`${paidPercent}%`

}}
/>

</div>

<span>

{paid}

</span>

</div>

<div className="progress-item">

<p>

Pending

</p>

<div className="progress">

<div
style={{

width:`${pendingPercent}%`,
background:"#dc2626"

}}
/>

</div>

<span>

{pending}

</span>

</div>

</div>

);

}