"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://imex-port.vercel.app/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading...</p>
      </div>
    );

  if (!product)
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Product not found
      </p>
    );

  const {
    product_name,
    product_image,
    price,
    price_min,
    price_max,
    origin_country,
    rating,
    available_quantity,
    category,
    condition,
    usage,
    status,
    location,
    sale_date,
    description,
    seller_name,
    email,
    seller_contact,
  } = product;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product_image}
            alt={product_name}
            className="w-full h-80 object-cover rounded-xl shadow"
          />
          <span className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </span>
          <span className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
            ⭐ {rating}
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product_name}</h1>

          <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${price?.toLocaleString()} /kg
              </p>
              <p className="text-sm text-gray-500">
                Range: ${price_min} - ${price_max}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Available Quantity</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {available_quantity > 0 ? `${available_quantity} pcs` : "Out of Stock"}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 capitalize">
                {status}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Condition:</span> {condition}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Usage:</span> {usage}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Origin Country:</span> {origin_country}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Location:</span> {location}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Expected Sale Date:</span>{" "}
                {new Date(sale_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Seller Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Name:</span> {seller_name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${email}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {email}
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Contact:</span> {seller_contact}
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-end mt-6">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300">
              <Link href={'/products'}>Go Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
