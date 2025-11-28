"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthContext } from "@/app/Provider/AuthProvider";

export default function Page() {
  const router = useRouter();
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Protect page: redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      short_description: e.target.short_description.value,
      full_description: e.target.full_description.value,
      price: parseFloat(e.target.price.value),
      date: e.target.date.value,
      priority: e.target.priority.value,
      image_url: e.target.image_url.value || "",
      created_by: user?.email || "anonymous",
    };

    try {
      const res = await fetch("https://imex-port.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      toast.success("Product added successfully!");
      e.target.reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {" "}
      <h2 className="text-3xl font-bold text-center mb-6">
        Add New Product{" "}
      </h2>{" "}
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        <input
          name="title"
          type="text"
          placeholder="Title"
          required
          className="input w-full rounded-full"
        />{" "}
        <input
          name="short_description"
          type="text"
          placeholder="Short Description"
          required
          className="input w-full rounded-full"
        />{" "}
        <textarea
          name="full_description"
          placeholder="Full Description"
          required
          rows={4}
          className="textarea w-full rounded-2xl"
        />{" "}
        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          className="input w-full rounded-full"
        />{" "}
        <input
          name="date"
          type="date"
          required
          className="input w-full rounded-full"
        />{" "}
        <input
          name="priority"
          type="text"
          placeholder="Priority"
          required
          className="input w-full rounded-full"
        />{" "}
        <input
          name="image_url"
          type="url"
          placeholder="Optional Image URL"
          className="input w-full rounded-full"
        />{" "}
        <button
          type="submit"
          className="btn w-full bg-primary text-white rounded-full"
        >
          Submit{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}
