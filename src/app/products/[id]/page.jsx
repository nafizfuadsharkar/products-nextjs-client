import React from "react";

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <div>
      <h1>pdetails</h1>
    </div>
  );
}
