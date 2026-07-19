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
        onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
      />

      <button onClick={() => onSearch(query)}>
        Search
      </button>
    </div>

  );

}