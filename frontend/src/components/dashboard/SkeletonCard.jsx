import "./SkeletonCard.css";

export default function SkeletonCard(){

return(

<div className="skeleton-grid">

{

Array.from({length:8}).map((_,index)=>(

<div
className="skeleton-card"
key={index}
/>

))

}

</div>

);

}