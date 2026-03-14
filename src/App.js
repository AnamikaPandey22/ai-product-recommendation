import "./App.css";
import React, { useState } from "react";
import PreferenceInput from "./components/PreferenceInput";
import ProductList from "./components/ProductList";
import { getRecommendations } from "./services/aiService";

function App() {

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (preference) => {
    if (!preference.trim()) return;

    setLoading(true);
    setSearched(true);
    setError("");

    try {
      const results = await getRecommendations(preference);
      setRecommendedProducts(results);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching recommendations.");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h1>AI Product Recommendation System</h1>

      <PreferenceInput onSearch={handleSearch} />

      {loading && (
        <p className="loading">
          AI is finding the best products for you...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {searched && !loading && !error && (
        <>
          <h2>Recommended Products</h2>
          <ProductList products={recommendedProducts} />
        </>
      )}

    </div>
  );
}

export default App;