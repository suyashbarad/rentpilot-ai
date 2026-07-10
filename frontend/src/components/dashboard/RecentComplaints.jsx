import "./RecentComplaints.css";

export default function RecentComplaints({

complaints=[]

}){

return(

<div className="recent-card">

<h2>

Recent Complaints

</h2>

<table>

<thead>

<tr>

<th>

Tenant

</th>

<th>

Complaint

</th>

<th>

Status

</th>

</tr>

</thead>

<tbody>

{

complaints.length===0?

(

<tr>

<td colSpan="3">

No complaints

</td>

</tr>

)

:

(

complaints.map((item,index)=>(

<tr key={index}>

<td>

{item.name}

</td>

<td>

{item.title}

</td>

<td>

<span
className={
item.status==="Resolved"
?
"badge paid"
:
"badge pending"
}
>

{item.status}

</span>

</td>

</tr>

))

)

}

</tbody>

</table>

</div>

);

}