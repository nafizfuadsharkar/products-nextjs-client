"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/app/Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ManageProductsPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://imex-port.vercel.app/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://imex-port.vercel.app/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading products...</p>
      </div>
    );

  if (!products.length)
    return (
      <div className="text-center py-10 text-gray-500">
        No products available
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Manage Products
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Image</th>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Price</th>
              <th className="text-left px-4 py-3 font-semibold">Stock</th>
              <th className="text-left px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.product_name}</td>
                <td className="px-4 py-3">${product.price?.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {product.available_quantity > 0 ? (
                    <span className="text-green-600 font-semibold">
                      {product.available_quantity} pcs
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
