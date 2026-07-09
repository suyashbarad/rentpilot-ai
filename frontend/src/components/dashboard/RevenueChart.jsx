import {

ResponsiveContainer,
AreaChart,
Area,
CartesianGrid,
Tooltip,
XAxis,
YAxis

} from "recharts";

import "./RevenueChart.css";

export default function RevenueChart({ analytics }) {

const data=[

{
month:"Collected",
amount:Number(analytics.totalRentCollected)||0
},

{
month:"Pending",
amount:Number(analytics.pendingRent)||0
}

];

return(

<div className="chart-card">

<h2>

Revenue Overview

</h2>

<div className="chart-container">

<ResponsiveContainer
width="100%"
height={320}
>

<AreaChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Area

type="monotone"

dataKey="amount"

stroke="#2563eb"

fill="#93c5fd"

/>

</AreaChart>

</ResponsiveContainer>

</div>

</div>

);

}