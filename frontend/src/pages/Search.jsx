import { useState } from "react";

import Layout from "../components/layout/Layout";

import SearchBar from "../components/search/SearchBar";
import SearchResults from "../components/search/SearchResults";

import searchService from "../services/searchService";

import "./Search.css";

export default function Search() {

  const [results,setResults]=useState(null);

  const handleSearch=async(q)=>{

    if(!q) return;

    try{

      const res=await searchService.search(q);

      setResults(res.data);

    }catch(err){

      console.log(err);

    }

  };

  return(

    <Layout>

      <div className="search-container">

        <h2>Global Search</h2>

        <SearchBar
          onSearch={handleSearch}
        />

        <SearchResults
          results={results}
        />

      </div>

    </Layout>

  );

}