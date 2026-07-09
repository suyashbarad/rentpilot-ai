import {

PieChart,
Pie,
Cell,
ResponsiveContainer,
Tooltip

} from "recharts";

import "./OccupancyChart.css";

export default function OccupancyChart({ stats }) {

const data=[

{

name:"Occupied",

value:stats.occupiedFlats||0

},

{

name:"Vacant",

value:stats.vacantFlats||0

}

];

const COLORS=[

"#16a34a",

"#f97316"

];

return(

<div className="occupancy-card">

<h2>

Occupancy

</h2>

<ResponsiveContainer
width="100%"
height={320}
>

<PieChart>

<Pie

data={data}

cx="50%"

cy="50%"

outerRadius={110}

label

dataKey="value"

>

{

data.map((entry,index)=>

<Cell

key={index}

fill={COLORS[index]}

/>

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

);

}