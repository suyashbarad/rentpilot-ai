import { useState } from "react";

import Layout from "../components/layout/Layout";
import SearchBar from "../components/search/SearchBar";
import SearchResults from "../components/search/SearchResults";
import searchService from "../services/searchService";

import "./Search.css";

export default function SearchPage() {
  const [results, setResults] = useState(null);

  const handleSearch = async (query) => {
    if (!query?.trim()) return;

    try {
      const response = await searchService.search(query.trim());
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults(null);
    }
  };

  return (
    <Layout>
      <div className="search-container">
        <h2>Global Search</h2>

        <SearchBar onSearch={handleSearch} />

        <SearchResults results={results} />
      </div>
    </Layout>
  );
}
