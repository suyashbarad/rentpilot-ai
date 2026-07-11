import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export default function SearchBar({

value,
onChange,
placeholder="Search..."

}){

return(

<div className="search-bar">

<FaSearch className="search-icon"/>

<input

type="text"

placeholder={placeholder}

value={value}

onChange={(e)=>onChange(e.target.value)}

/>

</div>

);

}