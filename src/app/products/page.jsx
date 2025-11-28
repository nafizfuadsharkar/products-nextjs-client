"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  // Load all products initially

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://imex-port.vercel.app/products");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();
    if (!search_text) return;

    setLoading(true);
    setSearched(true);

    fetch(`https://imex-port.vercel.app/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-center py-5">
        <span className="text-accent">All</span>{" "}
        <span className="text-primary">Products</span>{" "}
        <span className="text-accent">Here</span>
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex gap-2 justify-center"
      >
        <label className="input rounded-full flex items-center gap-2 px-4">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn btn-primary rounded-full">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading...</p>
        </div>
      )}

      {/* Product List */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* When searched but no results */}
      {!loading && products.length === 0 && searched && "No product found"}

      {/* When no products initially */}
      {!loading && products.length === 0 && !searched && (
        <p className="text-center text-gray-500 py-10">
          No products available yet.
        </p>
      )}
    </div>
  );
}
