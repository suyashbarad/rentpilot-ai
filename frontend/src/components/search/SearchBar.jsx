import { useState } from "react";

import "./SearchBar.css";

export default function SearchBar({ onSearch }) {

  const [query, setQuery] = useState("");

  return (

    <div className="search-box">

      <input
        placeholder="Search buildings, tenants, flats..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={() => onSearch(query)}
      >
        Search
      </button>

    </div>

  );

}